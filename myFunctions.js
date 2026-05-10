/**
 * myFunctions.js
 * ملف JavaScript المركزي لجميع وظائف الموقع
 */

// ===== بيانات الوجبات =====
var mealsData = [
    {
        code: "SF-001",
        name: "وجبة سمك بوري مشوي لشخصين",
        price: 110000,
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=300&h=200&fit=crop",
        kitchen: "المطبخ المصري",
        category: "مأكولات بحرية",
        ingredients: ["4 سمكات بوري أحمر مغسولة ومنظفة", "بضعة أوراق من الأوريجانو الطازج", "1 ملعقة صغيرة ملح طعام", "1 ملعقة صغيرة فلفل أسود مطحون"],
        sauce: ["1 ملعقة كبيرة زيت زيتون", "3 فصوص ثوم مقشرة ومقطعة", "1 حبة فلفل أحمر طازج منزوعة البذور", "6 حبات طماطم طرية مفرومة", "نصف ليمونة معصورة"]
    },
    {
        code: "MC-002",
        name: "منسف لحم خروف بالجميد",
        price: 250000,
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop",
        kitchen: "المطبخ الأردني",
        category: "لحوم",
        ingredients: ["1 كغ لحم خروف طازج", "500 غ جميد منقوع", "2 كوب أرز طويل الحبة", "رشة هيل وقرفة وبهارات منوعة"],
        sauce: ["مرق اللحم", "زيت سمن بلدي", "اللوز والصنوبر للتزيين"]
    },
    {
        code: "VG-003",
        name: "شاورما دجاج بالخضار",
        price: 65000,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=200&fit=crop",
        kitchen: "المطبخ الشامي",
        category: "دواجن",
        ingredients: ["300 غ صدر دجاج مشوي", "خبز مرقوق طازج", "طماطم وخيار وبصل", "طحينية وثوم"],
        sauce: ["صلصة الثوم البيضاء", "حامض حلو", "بهارات الشاورما"]
    },
    {
        code: "SW-004",
        name: "كنافة نابلسية بالجبن",
        price: 45000,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
        kitchen: "المطبخ الفلسطيني",
        category: "حلويات",
        ingredients: ["500 غ عجينة كنافة ناعمة", "400 غ جبن نابلسي أبيض", "200 غ سمن صافي", "شربات بالماء الزهر"],
        sauce: ["شربات السكر المعطر", "ماء الورد والهيل", "الفستق المطحون للتزيين"]
    },
    {
        code: "MP-005",
        name: "مضغوط دجاج بالأرز",
        price: 185000,
        image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=300&h=200&fit=crop",
        kitchen: "المطبخ الخليجي",
        category: "دواجن",
        ingredients: ["دجاجة كاملة 1.5 كغ", "3 أكواب أرز بسمتي", "بصل وطماطم وثوم", "بهارات المضغوط"],
        sauce: ["مرق الدجاج", "زعفران وكركم", "زبيب ومكسرات للتزيين"]
    },
    {
        code: "ST-006",
        name: "ستيك لحم بالصلصة الفرنسية",
        price: 320000,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
        kitchen: "مطبخ عالمي",
        category: "لحوم",
        ingredients: ["300 غ لحم بقر طازج درجة أولى", "زبدة وروزماري", "ثوم وفلفل أسود", "بطاطا مقلية"],
        sauce: ["صلصة المشروم بالقشطة", "مرق اللحم البني", "نبيذ أبيض للطهي"]
    }
];

// ===== المجموع المحدد =====
var selectedMeals = [];

// ===== إخفاء/إظهار تفاصيل الوجبة =====
function toggleDetails(code) {
    var row = $("#detail-" + code);
    var btn = $("#btn-" + code);
    if (row.is(":visible")) {
        row.hide("fast");
        btn.css("background", "").text("تفاصيل");
    } else {
        row.show("fast");
        btn.css("background", "#333").css("color", "#fff").text("إخفاء");
    }
}

// ===== تحديث قائمة الوجبات المحددة =====
function updateSelectedCount() {
    var count = $("input[name='meal']:checked").length;
    if (count > 0) {
        $(".summary-bar").show();
        $("#selected-count").text(count + " وجبة محددة");
    } else {
        $(".summary-bar").hide();
    }
}

// ===== عرض نموذج الطلب عند الضغط على متابعة =====
function showOrderForm() {
    selectedMeals = [];
    $("input[name='meal']:checked").each(function() {
        var code = $(this).val();
        var meal = getMealByCode(code);
        if (meal) selectedMeals.push(meal);
    });

    if (selectedMeals.length === 0) {
        alert("⚠️ الرجاء تحديد وجبة واحدة على الأقل!");
        return;
    }

    // عرض الوجبات المحددة في النموذج
    var listHTML = "";
    selectedMeals.forEach(function(m) {
        listHTML += "<tr><td>" + m.code + "</td><td>" + m.name + "</td><td>" + formatPrice(m.price) + "</td></tr>";
    });
    $("#selected-meals-list").html(listHTML);

    // إظهار النموذج
    $("#order-form-section").slideDown("slow");
    $("html, body").animate({ scrollTop: $("#order-form-section").offset().top - 80 }, 600);
}

// ===== التحقق من صحة المدخلات وإرسال الطلب =====
function submitOrder() {
    var valid = true;

    // التحقق من الاسم (أحرف إنجليزية وفراغ واحد بين الاسم والكنية)
    var fullName = $("#fullName").val().trim();
    var nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    if (fullName && !nameRegex.test(fullName)) {
        showError("nameError", "يجب إدخال الاسم بالأحرف الإنجليزية مع فراغ واحد بين الاسم والكنية");
        $("#fullName").addClass("invalid").removeClass("valid");
        valid = false;
    } else if (fullName) {
        hideError("nameError"); $("#fullName").addClass("valid").removeClass("invalid");
    }

    // التحقق من رقم الحساب المصرفي (6 خانات - واجب)
    var bankAcc = $("#bankAccount").val().trim();
    var bankRegex = /^\d{6}$/;
    if (!bankAcc) {
        showError("bankError", "رقم الحساب المصرفي واجب الإدخال!");
        $("#bankAccount").addClass("invalid").removeClass("valid");
        valid = false;
    } else if (!bankRegex.test(bankAcc)) {
        showError("bankError", "رقم الحساب المصرفي يجب أن يتألف من 6 أرقام بالضبط");
        $("#bankAccount").addClass("invalid").removeClass("valid");
        valid = false;
    } else {
        hideError("bankError"); $("#bankAccount").addClass("valid").removeClass("invalid");
    }

    // التحقق من تاريخ الطلب (yyyy-mm-dd)
    var orderDate = $("#orderDate").val().trim();
    var dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (orderDate && !dateRegex.test(orderDate)) {
        showError("dateError", "صيغة التاريخ يجب أن تكون dd-mm-yyyy");
        $("#orderDate").addClass("invalid").removeClass("valid");
        valid = false;
    } else if (orderDate) {
        hideError("dateError"); $("#orderDate").addClass("valid").removeClass("invalid");
    }

    // التحقق من رقم الموبايل (Syriatel: 099x أو MTN: 098x, 094x)
    var mobile = $("#mobile").val().trim();
    var mobileRegex = /^(099|098|094)\d{7}$/;
    if (mobile && !mobileRegex.test(mobile)) {
        showError("mobileError", "يجب إدخال رقم موبايل سوري صحيح (Syriatel: 099x أو MTN: 098x/094x)");
        $("#mobile").addClass("invalid").removeClass("valid");
        valid = false;
    } else if (mobile) {
        hideError("mobileError"); $("#mobile").addClass("valid").removeClass("invalid");
    }

    if (!valid) return;

    // حساب الإجماليات
    var total = 0;
    selectedMeals.forEach(function(m) { total += m.price; });
    var tax = total * 0.10;
    var net = total - tax;

    // عرض نتيجة الطلب في Modal
    showOrderSummary(fullName, total, tax, net);
}

// ===== عرض ملخص الطلب =====
function showOrderSummary(customerName, total, tax, net) {
    var rows = "";
    selectedMeals.forEach(function(m) {
        rows += "<tr><td>" + m.code + "</td><td>" + m.name + "</td><td>" + formatPrice(m.price) + " ل.س</td></tr>";
    });

    var name = customerName || "عميل كريم";
    var summaryHTML =
        "<p style='margin-bottom:15px;'>شكراً <strong>" + name + "</strong>! تم استلام طلبك بنجاح ✅</p>" +
        "<table class='modal-table'>" +
        "<thead><tr><th>الرمز</th><th>الوجبة</th><th>السعر</th></tr></thead>" +
        "<tbody>" + rows +
        "<tr class='total-row'><td colspan='2'><strong>المجموع الإجمالي</strong></td><td><strong>" + formatPrice(total) + " ل.س</strong></td></tr>" +
        "<tr style='color:#e67e22;'><td colspan='2'>مبلغ الضريبة (10%)</td><td>" + formatPrice(tax) + " ل.س</td></tr>" +
        "<tr style='color:#27ae60; font-weight:bold;'><td colspan='2'>المبلغ الصافي (بعد حسم الضريبة)</td><td>" + formatPrice(net) + " ل.س</td></tr>" +
        "</tbody></table>";

    $("#order-summary").html(summaryHTML);
    $("#result-modal").addClass("show");
}

// ===== مساعدات =====
function getMealByCode(code) {
    for (var i = 0; i < mealsData.length; i++)
        if (mealsData[i].code === code) return mealsData[i];
    return null;
}

function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showError(id, msg) { $("#" + id).text(msg).addClass("show"); }
function hideError(id) { $("#" + id).removeClass("show").text(""); }

function closeModal() { $("#result-modal").removeClass("show"); }

// ===== تحميل الصفحة =====
$(document).ready(function() {
    // إغلاق Modal عند النقر خارجه
    $("#result-modal").on("click", function(e) {
        if ($(e.target).is("#result-modal")) closeModal();
    });
});
