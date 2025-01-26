import { Route, Routes } from 'react-router-dom'

import { Home, ContactUs, About } from '../pages'

export const Router = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
    )
}