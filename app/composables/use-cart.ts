import Client, {Checkout, CheckoutLineItem, CheckoutLineItemInput, CheckoutResource} from 'shopify-buy';
import ShopifyBuy from "shopify-buy";

let client: ShopifyBuy | undefined
let checkout: Checkout | undefined
const lineItems = ref<CheckoutLineItem[]>([])
const checkoutUrl = ref<string | null>(null)

function createClient() {
    return Client.buildClient({
        domain: 'nuxt-sanity-45645623.myshopify.com/',
        storefrontAccessToken: 'a12f1fe4b353877f6ad9fbbf2984e59a',
        apiVersion: ''
    });
}

function getClient(): ShopifyBuy {
    if (!client) client = createClient()

    return client
}

async function getCheckout(): Promise<Checkout> {
    const client = getClient()

    if (!checkout) {
        checkout = await (client.checkout as CheckoutResource).create()
        checkoutUrl.value = checkout.webUrl
    }

    return checkout
}

async function addLineItems(value: CheckoutLineItemInput[]): Promise<Checkout> {
    const globalCheckout = await getCheckout()
    const checkoutId = globalCheckout.id

    checkout = await getClient().checkout.addLineItems(checkoutId, unref(value))
    checkoutUrl.value = checkout.webUrl
    lineItems.value = checkout.lineItems

    return checkout
}

async function updateLineItems() {
    const localCheckout = await getCheckout()
    const fetchedCheckout = await getClient().checkout.fetch(localCheckout.id)

    lineItems.value = fetchedCheckout.lineItems
}

export default function() {
    return {
        getClient,
        getCheckout,
        addLineItems,
        updateLineItems,
        lineItems,
        checkoutUrl
    }
}
