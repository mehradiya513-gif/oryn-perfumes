'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

    const light = new THREE.PointLight(0xf5e0d3, 1.6)
    light.position.set(5, 5, 5)
    scene.add(light)

    const fill = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(fill)

    const geometry = new THREE.SphereGeometry(1.7, 48, 48)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe9c8b5,
      roughness: 0.15,
      metalness: 0.2,
      transmission: 0.9,
      clearcoat: 0.8,
      opacity: 0.95,
      transparent: true,
    })
    const perfumeSphere = new THREE.Mesh(geometry, material)
    scene.add(perfumeSphere)

    const ringGeometry = new THREE.TorusGeometry(2.3, 0.08, 16, 100)
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x8a6b62, roughness: 0.35 })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    const handleResize = () => {
      if (!canvas) return
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()
    const frameId = requestAnimationFrame(function animate() {
      const elapsed = clock.getElapsedTime()
      perfumeSphere.rotation.y = elapsed * 0.3
      ring.rotation.z = elapsed * 0.12
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      renderer.dispose()
      scene.remove(perfumeSphere, ring, light, fill)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full min-h-[280px] rounded-[32px]" />
}
