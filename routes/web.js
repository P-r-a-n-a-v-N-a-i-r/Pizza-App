const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')


//Middlewares
const admin = require('../app/http/middleware/admin')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const customer = require('../app/http/middleware/customer')

function initRoutes(app) {
    app.get('/', homeController().index)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    
    app.get('/login',  guest, authController().login)
    app.post('/login', authController().postLogin)
    
    app.get('/register', guest, authController().register)
    app.post('/register',authController().postRegister)

    app.post('/logout', authController().logout)

    //Customer routes
    app.post('/orders',auth, orderController().store)
    app.get('/customer/orders',auth, customer, orderController().index)
    app.get('/customer/orders/:_id', auth, orderController().show)

    //Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
}

module.exports = initRoutes