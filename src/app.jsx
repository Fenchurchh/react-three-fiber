import "./style.css"
import ReactDOM from "react-dom"
import React, {useRef, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {useSpring, animated, config} from '@react-spring/three'
import {Billboard, Line, Text} from "@react-three/drei"

function Box(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if(!active) return
        return (ref.current.rotation.y += 0.001)
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    const {scale} = useSpring({scale: active ? 1.5 : 0.1})
    return (
        <animated.mesh
            {...props}
            ref={ref}
            scale={scale}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <icosahedronGeometry args={[1, 3, 3]}/>
            <meshPhongMaterial attach="material" color={active ? "#fefefe": "#f0f0f0"} wireframe />
        </animated.mesh>
    )
}

function PlanetName(props) {
    return <>
        <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false} // Lock the rotation on the z axis (default=false)
        >
            <Text
                font="/fonts/play-v12-latin-700.woff"
                // font="/fonts/play-v12-latin-regular.woff"
                {...props}
                fontSize={.25}
                color="white" anchorX="center" anchorY="middle">TRANTOR PRIME</Text>
        </Billboard>

        <Line
            points={[[0, 0, 0], [0,1,0]]}       // Array of points
            color="white"                   // Default
            lineWidth={0.2}                   // In pixels (default)
            dashed={false}                  // Default
            vertexColors={[[255, 255, 255], [255, 255, 255]]} // Optional array of RGB values for each point
        />
    </>
}


ReactDOM.render(<Canvas>
        <ambientLight/>
        <pointLight position={[10, 10, 10]}/>
        <PlanetName position={[0, 1, 0]}/>
        <Box position={[0, 0, 0]}/>
    </Canvas>,
    document.getElementById('root'),
)
