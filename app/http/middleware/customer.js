function customer(req, res, next){
    if(req.isAuthenticated() && req.user.role === 'customer'){
        return res.redirect('/customer/orders')
    }
    return res.redirect('/')
}

module.exports = customer