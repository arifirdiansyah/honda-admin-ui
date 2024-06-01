
const defineHeaders = async () => {
    return {
        headers: { Authorization: `Bearer ${token()}` }
    }
}