import react, { useState } from 'react'
import './App.css'

import { Wrapper } from './layout/wrapper/Wrapper'

import { Header } from './components/header/Header'

function App() {
	return (
		<>
			<Header />
			<Wrapper />
		</>
	)
}

export default App
