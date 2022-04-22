/* eslint-disable */
import axios from 'axios'
var stripe = Stripe('pk_test_51Kj4CmFy3c3WktpCYRnpBRoKsADgC7Sv8DZPslyj00GApOgRknBBjr2TfpWF322EAjYmxRNyC9xml2NNK1RlpzMM004CP1j2oT')

export const bookTour = async (tourId) => {
    try{
        // 1. get checkout session from API
        const session = await axios(`http://127.0.0.1:3000/bookings/checkout-session/${tourId}`)
        console.log(session)
        // 2. create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    }catch(err) {
        console.log(err)
    }
}

