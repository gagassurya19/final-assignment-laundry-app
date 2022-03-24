const ROLE = {
    ADMIN: 'admin',
    KASIR: 'kasir',
    OWNER: 'owner'
}

const GET = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER]
}

const POST = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER]
}

const PUT = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER]
}

const DELETE = {
    "/admin_administrator": [ROLE.ADMIN],
    "/admin_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_outlet": [ROLE.ADMIN],
    "/admin_package": [ROLE.ADMIN],
    "/admin_address_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_payment_customer": [ROLE.ADMIN, ROLE.KASIR],
    "/admin_transaction": [ROLE.ADMIN, ROLE.KASIR, ROLE.OWNER]
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