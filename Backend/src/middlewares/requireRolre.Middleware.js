function requireRole(role) {
    try {
return (req,res,next) => {
    if (req?.theuser?.role !== role) {
        return res.status(401).json({error : "Acceso denegado"})
    }
    next()
}
    } catch (error) {
        console.error(error)
        return res.status(401).json({ error: "Invalid Rol" });
    }
}

module.exports = {
    requireRole
}