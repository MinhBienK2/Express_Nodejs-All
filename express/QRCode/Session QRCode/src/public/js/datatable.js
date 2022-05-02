
$(document).ready(function () {
    $("#display").DataTable({
        // language: {
        //     processing: "Message khi đang tải dữ liệu",
        //     search: "Placeholder của input tìm kiếm",
        //     lengthMenu: "Điều chỉnh số lượng bản ghi trên 1 trang _MENU_ ",
        //     info: "Bản ghi từ _START_ đến _END_ Tổng công _TOTAL_ bản ghi",
        //     infoEmpty: "Khi không có dữ liệu, Hiển thị 0 bản ghi trong 0 tổng cộng 0 ",
        //     infoFiltered: "(Message bổ sung cho info khi không search đc record nào _MAX_)",
        //     infoPostFix: "Alo Alo", // Cái này khi thêm vào nó sẽ đứng sau info
        //     loadingRecords: "",
        //     zeroRecords: "Khi tìm kiếm không match với record nào",
        //     emptyTable: "Không có dữ liệu",
        //     paginate: {
        //         first: "Trang đầu",
        //         previous: "Trang trước",
        //         next: "Trang sau",
        //         last: "Trang cuối"
        //     },
        //     aria: {
        //         sortAscending: ": Message khi đang sắp xếp theo column",
        //         sortDescending: ": Message khi đang sắp xếp theo column",
        //     }
        // },
        // columns: [
        //     { data: 'product_category.name' },
        //     { data: 'name' },
        //     { data: 'slug' },
        //     { data: 'quantity' },
        //     { data: 'price' },
        // ], // Các thuộc tính của product sẽ  match với từng collumn
        // searching: false, // Mặc định là true, set false để tắt chức năng search
        // ordering:  false, // Mặc định là true, set false để tắt chức năng sắp xếp theo collumn
        // paging: false, // Mặc định là true, set false để tắt chức năng phân trang
        // scrollX: 400, // Nội dụng của table sẽ hiện thị với with 400px, Nếu quá thì sẽ có thanh scroll
        // scrollY: 400, // Nội dụng của table sẽ hiện thị với hieght 400px, Nếu quá thì sẽ có thanh scroll
        // processing: true,
        // info: false, // Tắt thông tin về table VD: Showing 1 to 14 of 14 entries
    });
});