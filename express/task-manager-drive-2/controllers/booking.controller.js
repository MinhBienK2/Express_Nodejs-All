const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Kj4CmFy3c3WktpCR6sySsIPuZJB7tNXyMN1vauUI4JtgAeCGgzpgLKBu0bOSn6LKUA0y9NmX9oDS8bkYSnj4SAm00LLCGGt7N');
const Tour = require('../src/models/tour')
const CatchAsync = require('../utils/CatchAsync')

exports.checkoutSessions = CatchAsync(async (req,res,next) => {
    const tour =await Tour.findById(req.params.tourId)
    // 2. create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url : `${req.protocol}://${req.get('host')}`,
        cancel_url : `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email : req.user.email,
        client_reference_id : req.params.tourId,
        line_items : [
            {
                name : `${tour.name} Tour`,
                description : tour.summary,
                images : [
                    `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
                ],
                amount : tour.price * 100,
                currency : 'usd',
                quantity : 1
            }
        ]
    })

    res.status(200).json({
        status : 'success',
        session
    })
})