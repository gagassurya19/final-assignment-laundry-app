const ROLE = {
    ADMIN: 'admin',
    KASIR: 'kasir',
    OWNER: 'owner',
    CUSTOMER: undefined
}

const GET = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER],
    "/customer_address_customer": [ROLE.CUSTOMER],
    "/customer_payment_customer": [ROLE.CUSTOMER],
    "/customer_transaction": [ROLE.CUSTOMER],
    "/customer_crud": [ROLE.CUSTOMER],
    "/customer_invoice": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER, ROLE.CUSTOMER],
}

const POST = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER],
    "/customer_address_customer": [ROLE.CUSTOMER],
    "/customer_payment_customer": [ROLE.CUSTOMER],
    "/customer_transaction": [ROLE.CUSTOMER],
    "/customer_crud": [ROLE.CUSTOMER]
}

const PUT = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER],
    "/customer_address_customer": [ROLE.CUSTOMER],
    "/customer_payment_customer": [ROLE.CUSTOMER],
    "/customer_transaction": [ROLE.CUSTOMER],
    "/customer_crud": [ROLE.CUSTOMER]
}

const DELETE = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER],
    "/customer_address_customer": [ROLE.CUSTOMER],
    "/customer_payment_customer": [ROLE.CUSTOMER],
    "/customer_transaction": [ROLE.CUSTOMER],
    "/customer_crud": [ROLE.CUSTOMER]
}

function canAccess(method, endpoint, role){
    if(method === 'GET' && GET[endpoint].includes(role)){  
        return true
    } else if(method == 'POST' && POST[endpoint].includes(role)){
        return true
    } else if(method == 'PUT' && PUT[endpoint].includes(role)){
        return true
    } else if(method == 'DELETE' && DELETE[endpoint].includes(role)){
        return true
    } else {
        return false
    }
}

module.exports = {
    canAccess
}