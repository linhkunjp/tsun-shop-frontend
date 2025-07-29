
// Tổng tiền
export function recalcTotal(price: string, quantity: number) {
    const num = parseInt(
        price.replace('₫', '').replace(/,/g, ''),
        10
    )
    const total = num * quantity

    // Định dạng: 1,234,567
    return total.toLocaleString('en-US')
};

// Tạo userId khi chưa đăng nhập
export function createGuestId(): string {
    const key = "guest_id";
    let id = localStorage.getItem(key);

    if (!id) {
        id = "guest_" + crypto.randomUUID();
        localStorage.setItem(key, id);
    }

    return id;
}