"use strict";
var KTProjectOverview1 = function () {
    var t = KTUtil.getCssVariableValue("--kt-primary"),
        e = KTUtil.getCssVariableValue("--kt-primary-light"),
        a = KTUtil.getCssVariableValue("--kt-success"),
        r = KTUtil.getCssVariableValue("--kt-success-light"),
        o = KTUtil.getCssVariableValue("--kt-gray-200"),
        n = KTUtil.getCssVariableValue("--kt-gray-500");
    return {
        init: function () {
            var s, i;
            ! function () {
                var t = document.getElementById("project_overview_chart1");
                if (t) {
                    var e = t.getContext("2d");
                    new Chart(e, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                data: [0, 8, 0, 0, 0, 0],
                                backgroundColor: ["#378AFF", "#FFA32F", "#F54F52", "#9552EA", "#FFEC21", "#93F03B"]
                            }],
                            labels: ["MoU Signed", "Joint Planning Session", "Pilot Project", "Business Plan", "Head Of Agreement", "Completed"]
                        },
                        options: {
                            chart: {
                                fontFamily: "inherit"
                            },
                            cutoutPercentage: 75,
                            responsive: !0,
                            maintainAspectRatio: !1,
                            cutout: "75%",
                            title: {
                                display: !1
                            },
                            animation: {
                                animateScale: !0,
                                animateRotate: !0
                            },
                            tooltips: {
                                enabled: !0,
                                intersect: !1,
                                mode: "nearest",
                                bodySpacing: 5,
                                yPadding: 10,
                                xPadding: 10,
                                caretPadding: 0,
                                displayColors: !1,
                                backgroundColor: "#20D489",
                                titleFontColor: "#ffffff",
                                cornerRadius: 4,
                                footerSpacing: 0,
                                titleSpacing: 0
                            },
                            plugins: {
                                legend: {
                                    display: !1
                                }
                            }
                        }
                    })
                }
            }(), s = document.getElementById("kt_project_overview_graph"), i = parseInt(KTUtil.css(s, "height")), s && new ApexCharts(s, {
                series: [{
                    name: "Incomplete",
                    data: [70, 70, 80, 80, 75, 75, 75]
                }, {
                    name: "Complete",
                    data: [55, 55, 60, 60, 55, 55, 60]
                }],
                chart: {
                    type: "area",
                    height: i,
                    toolbar: {
                        show: !1
                    }
                },
                plotOptions: {},
                legend: {
                    show: !1
                },
                dataLabels: {
                    enabled: !1
                },
                fill: {
                    type: "solid",
                    opacity: 1
                },
                stroke: {
                    curve: "smooth",
                    show: !0,
                    width: 3,
                    colors: [t, a]
                },
                xaxis: {
                    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    axisBorder: {
                        show: !1
                    },
                    axisTicks: {
                        show: !1
                    },
                    labels: {
                        style: {
                            colors: n,
                            fontSize: "12px"
                        }
                    },
                    crosshairs: {
                        position: "front",
                        stroke: {
                            color: t,
                            width: 1,
                            dashArray: 3
                        }
                    },
                    tooltip: {
                        enabled: !0,
                        formatter: void 0,
                        offsetY: 0,
                        style: {
                            fontSize: "12px"
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: n,
                            fontSize: "12px"
                        }
                    }
                },
                states: {
                    normal: {
                        filter: {
                            type: "none",
                            value: 0
                        }
                    },
                    hover: {
                        filter: {
                            type: "none",
                            value: 0
                        }
                    },
                    active: {
                        allowMultipleDataPointsSelection: !1,
                        filter: {
                            type: "none",
                            value: 0
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: "12px"
                    },
                    y: {
                        formatter: function (t) {
                            return t + " tasks"
                        }
                    }
                },
                colors: [e, r],
                grid: {
                    borderColor: o,
                    strokeDashArray: 4,
                    yaxis: {
                        lines: {
                            show: !0
                        }
                    }
                },
                markers: {
                    colors: [e, r],
                    strokeColor: [t, a],
                    strokeWidth: 3
                }
            }).render(),
                function () {
                    var t = document.querySelector("#kt_profile_overview_table");
                    if (!t) return;
                    t.querySelectorAll("tbody tr").forEach((t => {
                        const e = t.querySelectorAll("td"),
                            a = moment(e[1].innerHTML, "MMM D, YYYY").format();
                        e[1].setAttribute("data-order", a)
                    }));
                    const e = $(t).DataTable({
                        info: !1,
                        order: []
                    }),
                        a = document.getElementById("kt_filter_orders"),
                        r = document.getElementById("kt_filter_year");
                    var o, n;
                    a.addEventListener("change", (function (t) {
                        e.column(3).search(t.target.value).draw()
                    })), r.addEventListener("change", (function (t) {
                        switch (t.target.value) {
                            case "thisyear":
                                o = moment().startOf("year").format(), n = moment().endOf("year").format(), e.draw();
                                break;
                            case "thismonth":
                                o = moment().startOf("month").format(), n = moment().endOf("month").format(), e.draw();
                                break;
                            case "lastmonth":
                                o = moment().subtract(1, "months").startOf("month").format(), n = moment().subtract(1, "months").endOf("month").format(), e.draw();
                                break;
                            case "last90days":
                                o = moment().subtract(30, "days").format(), n = moment().format(), e.draw();
                                break;
                            default:
                                o = moment().subtract(100, "years").startOf("month").format(), n = moment().add(1, "months").endOf("month").format(), e.draw()
                        }
                    })), $.fn.dataTable.ext.search.push((function (t, e, a) {
                        var r = o,
                            s = n,
                            i = parseFloat(moment(e[1]).format()) || 0;
                        return !!(isNaN(r) && isNaN(s) || isNaN(r) && i <= s || r <= i && isNaN(s) || r <= i && i <= s)
                    })), document.getElementById("kt_filter_search").addEventListener("keyup", (function (t) {
                        e.search(t.target.value).draw()
                    }))
                }()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTProjectOverview1.init()
}));