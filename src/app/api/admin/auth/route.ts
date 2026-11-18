import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    let hasAdmin = false;

    // Check env override first
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      hasAdmin = true;
    } else {
      try {
        await connectToDatabase();
        const count = await Admin.countDocuments();
        hasAdmin = count > 0;
      } catch (dbErr) {
        console.error('Database check error in admin auth:', dbErr);
        // If DB fails, fallback to hasAdmin = false
      }
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    return NextResponse.json({
      authenticated: session.valid,
      username: session.username || null,
      hasAdmin,
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ error: 'Failed to verify admin status' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || 'login';
    const username = (body.username || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // 1. Initial First-Time Setup of Admin Credentials
    if (action === 'setup') {
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }

      await connectToDatabase();
      const existingCount = await Admin.countDocuments();

      if (existingCount > 0 && !(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD)) {
        return NextResponse.json({ error: 'Admin account already exists. Please sign in.' }, { status: 400 });
      }

      const { hash, salt } = hashPassword(password);
      const newAdmin = new Admin({
        username,
        passwordHash: hash,
        salt,
      });
      await newAdmin.save();

      const token = createSessionToken(username);
      const response = NextResponse.json({ success: true, message: 'Admin account created successfully' });

      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    // 2. Regular Login
    // Check environment variable credentials first
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      const envUser = process.env.ADMIN_USERNAME.trim().toLowerCase();
      const envPass = process.env.ADMIN_PASSWORD.trim();

      if (username === envUser && password === envPass) {
        const token = createSessionToken(username);
        const response = NextResponse.json({ success: true });
        response.cookies.set(ADMIN_COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60,
        });
        return response;
      }
    }

    // Check database Admin records
    await connectToDatabase();
    const adminRecord = await Admin.findOne({ username });

    if (!adminRecord) {
      const totalAdmins = await Admin.countDocuments();
      if (totalAdmins === 0) {
        return NextResponse.json({
          error: 'No admin account configured yet. Please complete first-time setup.',
          needsSetup: true,
        }, { status: 400 });
      }
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const isValid = verifyPassword(password, adminRecord.passwordHash, adminRecord.salt);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = createSessionToken(username);
    const response = NextResponse.json({ success: true });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error in admin auth handler:', error);
    return NextResponse.json({ error: 'Authentication failed. Please verify database connection.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session.valid || !session.username) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = (body.currentPassword || '').trim();
    const newUsername = (body.newUsername || '').trim().toLowerCase();
    const newPassword = (body.newPassword || '').trim();

    if (!currentPassword || !newUsername || !newPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    await connectToDatabase();
    const adminRecord = await Admin.findOne({ username: session.username });

    if (!adminRecord) {
      return NextResponse.json({ error: 'Admin account not found in database' }, { status: 404 });
    }

    const isMatch = verifyPassword(currentPassword, adminRecord.passwordHash, adminRecord.salt);
    if (!isMatch) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const { hash, salt } = hashPassword(newPassword);
    adminRecord.username = newUsername;
    adminRecord.passwordHash = hash;
    adminRecord.salt = salt;
    await adminRecord.save();

    const newToken = createSessionToken(newUsername);
    const response = NextResponse.json({ success: true, message: 'Credentials updated successfully' });

    response.cookies.set(ADMIN_COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
  return response;
}
