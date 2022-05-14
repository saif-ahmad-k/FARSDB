var appCache = 0,
  apiUrl = '',
  CKEDITOR_BASEPATH = '',
  SORT_ORDER_ASC = 1,
  SORT_ORDER_DESC = 2,
  PSF_STATUS_REVIEWED = 1,
  PSF_STATUS_NONE = 0,
  PSF_STATUS_NOT_REVIEWED = 2,
  sortOrder = SORT_ORDER_ASC,
  sortBy = 1,
  pageIndex = 0,
  pageSize = 50,
  totalPages = 1,
  loadingInProgress = false,
  $tempDiv,
  isPopup = false,
  isIframe = self !== top,
  htmlLazy = '<div class="lazyloader"></div>',
  htmlLazyRow =
    '<tr><td colspan="20"><div class="lazyloader-table"></div></td></tr>',
  htmlNoRecord = '<div class="alert alert-alaram">No record exists</div>',
  htmlNoRecordRow =
    '<tr><td colspan="20"><div class="alert alert-alaram">No record exists</div></td></tr>',
  noRecordFoundText = 'No record found.',
  popup,
  sortCallback = null,
  routeData = '',
  resourceFolderPath = '',
  tenantId = 1,
  currentUserId = 0,
  mdlby = null,
  $inlinePopupDiv;

(function () {
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp */) {
      'use strict';

      if (this === void 0 || this === null) throw new TypeError();

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') throw new TypeError();

      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t)) res.push(val);
        }
      }

      return res;
    };
  }

  jQuery.fn.outerHTML = function (s) {
    return s
      ? this.before(s).remove()
      : jQuery('<p>').append(this.eq(0).clone()).html();
  };
})();

$(document).ready(function () {
  main_documentReady();
}); // End document.ready
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main_documentReady() {
  async(initToaster());


  if ($('.fixpos').length > 0) {
    var startPos = 700;
    var endPos = 2400;
    var isFloating = false;
    $(window).scroll(function () {
      var currentScroll = $(window).scrollTop();
      if (!isFloating && currentScroll > startPos && currentScroll < endPos) {
        $('.fixpos').addClass('fix-position');
        startPos = 400;
        isFloating = true;
        console.log('showing....');
      }

      if (isFloating && (currentScroll < startPos || currentScroll > endPos)) {
        $('.fixpos').removeClass('fix-position');
        startPos = 700;
        isFloating = false;
        console.log('hiding<<<<');
      }

      if (isFloating) {
        $('.fixpos').width($('.btn-group-toggle').width() - 32);
        console.log(
          $('.fixpos').width() + ':' + $('.btn-group-toggle').width()
        );
      } else {
        $('.fixpos').css('width', '');
      }
    });
  }
}

var loadingFromOtherTab = false;

function logout() {
  localStorage.removeItem('mdlby');

  sessionStorage.clear();

  redirectTo('/login');
}

function initSimpleSelect2($parent) {
  if ($parent) {
    $parent.find('.ddlselect2').select2({
      minimumInputLength: 0,
    });
  } else if ($('.ddlselect2').length > 0) {
    $('.ddlselect2').select2({
      minimumInputLength: 0,
    });
  }
}

function initDateTimePicker($parent) {
  if ($parent) {
    $parent.find('.datetimepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      showTodayButton: true,
      showClear: true,
    });
  } else if ($('.datetimepicker').length > 0) {
    $('.datetimepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      showTodayButton: true,
      showClear: true,
    });
  }
}

function fixSideBarAndContentHeight() {
  //Menu should not get close on non clickable items
  $('.dropdown-submenu').click(function (event) {
    event.stopPropagation();
  });

  // Panel Control
  $('.panel-collapse').click(function () {
    $(this).closest('.panel').children('.panel-body').slideToggle('fast');
  });

  $('.panel-remove').click(function () {
    $(this).closest('.panel').hide();
  });

  // Push Menu
  $('.push-sidebar').click(function () {
    var hidden = $('.sidebar');

    if (hidden.hasClass('visible')) {
      hidden.removeClass('visible');
      $('.page-inner').removeClass('sidebar-visible');
    } else {
      hidden.addClass('visible');
      $('.page-inner').addClass('sidebar-visible');
    }
  });

  // .toggleAttr() Function
  $.fn.toggleAttr = function (a, b) {
    var c = b === undefined;
    return this.each(function () {
      if ((c && !$(this).is('[' + a + ']')) || (!c && b)) $(this).attr(a, a);
      else $(this).removeAttr(a);
    });
  };

  // Sidebar Menu
  var parent, ink, d, x, y;
  $('.sidebar .accordion-menu li .sub-menu').slideUp(0);
  $('.sidebar .accordion-menu li.open .sub-menu').slideDown(0);
  $('.small-sidebar .sidebar .accordion-menu li.open .sub-menu').hide(0);

  $('.sidebar .accordion-menu .sub-menu li.droplink > a').click(function () {
    var menu = $(this).parent().parent(),
      sidebar = $('.page-sidebar-inner'),
      page = $('.page-content'),
      sub = $(this).next(),
      el = $(this);

    menu.find('li').removeClass('open');
    sidebarAndContentHeight();

    if (!sub.is(':visible')) {
      $(this).parent('li').addClass('open');
      $(this)
        .next('.sub-menu')
        .slideDown(200, function () {
          sidebarAndContentHeight();
        });
    } else {
      sub.slideUp(200, function () {
        sidebarAndContentHeight();
      });
    }
    return false;
  });

  // Makes .page-inner height same as .page-sidebar height
  var sidebarAndContentHeight = function () {
    var content = $('.page-inner'),
      sidebar = $('.page-sidebar'),
      body = $('body'),
      height,
      footerHeight = $('.page-footer').outerHeight(),
      pageContentHeight = $('.page-content').height();

    content.attr('style', 'min-height:' + sidebar.height() + 'px !important');

    if (body.hasClass('page-sidebar-fixed')) {
      height = sidebar.height() + footerHeight;
    } else {
      height = sidebar.height() + footerHeight;
      if (height < $(window).height()) {
        height = $(window).height();
      }
    }

    if (height >= content.height()) {
      content.attr('style', 'min-height:' + height + 'px !important');
    }
  };

  sidebarAndContentHeight();

  window.onresize = sidebarAndContentHeight;

  // Layout Settings
  var fixedHeaderCheck = document.querySelector('.fixed-header-check'),
    fixedSidebarCheck = document.querySelector('.fixed-sidebar-check'),
    horizontalBarCheck = document.querySelector('.horizontal-bar-check'),
    toggleSidebarCheck = document.querySelector('.toggle-sidebar-check'),
    compactMenuCheck = document.querySelector('.compact-menu-check'),
    hoverMenuCheck = document.querySelector('.hover-menu-check'),
    defaultOptions = function () {
      if (
        $('body').hasClass('small-sidebar') &&
        toggleSidebarCheck.checked == 1
      ) {
        toggleSidebarCheck.click();
      }

      if (
        !$('body').hasClass('page-header-fixed') &&
        fixedHeaderCheck.checked == 0
      ) {
        fixedHeaderCheck.click();
      }

      if (
        $('body').hasClass('page-sidebar-fixed') &&
        fixedSidebarCheck.checked == 1
      ) {
        fixedSidebarCheck.click();
      }

      if (
        $('body').hasClass('page-horizontal-bar') &&
        horizontalBarCheck.checked == 1
      ) {
        horizontalBarCheck.click();
      }

      if ($('body').hasClass('compact-menu') && compactMenuCheck.checked == 1) {
        compactMenuCheck.click();
      }

      if ($('body').hasClass('hover-menu') && hoverMenuCheck.checked == 1) {
        hoverMenuCheck.click();
      }

      // $(".theme-color").attr("href", 'assets/css/themes/white.css');

      sidebarAndContentHeight();
    },
    str = $('.navbar .logo-box a span').text(),
    smTxt = str.slice(0, 1),
    collapseSidebar = function () {
      $('body').toggleClass('small-sidebar');
      //  $('.navbar .logo-box a span').html($('.navbar .logo-box a span').text() == smTxt ? str : smTxt);
      sidebarAndContentHeight();
    },
    fixedHeader = function () {
      if (
        $('body').hasClass('page-horizontal-bar') &&
        $('body').hasClass('page-sidebar-fixed') &&
        $('body').hasClass('page-header-fixed')
      ) {
        fixedSidebarCheck.click();
        alert(
          "Static header isn't compatible with fixed horizontal nav mode. Modern will set static mode on horizontal nav."
        );
      }
      $('body').toggleClass('page-header-fixed');
      sidebarAndContentHeight();
    },
    fixedSidebar = function () {
      if (
        $('body').hasClass('page-horizontal-bar') &&
        !$('body').hasClass('page-sidebar-fixed') &&
        !$('body').hasClass('page-header-fixed')
      ) {
        fixedHeaderCheck.click();
        alert(
          "Fixed horizontal nav isn't compatible with static header mode. Modern will set fixed mode on header."
        );
      }
      if (
        $('body').hasClass('hover-menu') &&
        !$('body').hasClass('page-sidebar-fixed')
      ) {
        hoverMenuCheck.click();
        alert(
          "Fixed sidebar isn't compatible with hover menu mode. Modern will set accordion mode on menu."
        );
      }
      $('body').toggleClass('page-sidebar-fixed');
      if ($('body').hasClass('.page-sidebar-fixed')) {
        $('.page-sidebar-inner').slimScroll({
          destroy: true,
        });
      }
      $('.page-sidebar-inner').slimScroll();
      sidebarAndContentHeight();
    },
    horizontalBar = function () {
      $('.sidebar').toggleClass('horizontal-bar');
      $('.sidebar').toggleClass('page-sidebar');
      $('body').toggleClass('page-horizontal-bar');
      if (
        $('body').hasClass('page-sidebar-fixed') &&
        !$('body').hasClass('page-header-fixed')
      ) {
        fixedHeaderCheck.click();
        alert(
          "Static header isn't compatible with fixed horizontal nav mode. Modern will set static mode on horizontal nav."
        );
      }
      sidebarAndContentHeight();
    },
    compactMenu = function () {
      $('body').toggleClass('compact-menu');
      sidebarAndContentHeight();
    },
    hoverMenu = function () {
      if (
        !$('body').hasClass('hover-menu') &&
        $('body').hasClass('page-sidebar-fixed')
      ) {
        fixedSidebarCheck.click();
        alert(
          "Fixed sidebar isn't compatible with hover menu mode. Modern will set static mode on sidebar."
        );
      }
      $('body').toggleClass('hover-menu');
      sidebarAndContentHeight();
    };

  // Logo text on Collapsed Sidebar
  $('.small-sidebar .navbar .logo-box a span').html(
    $('.navbar .logo-box a span').text() == smTxt ? str : smTxt
  );

  if (!$('.theme-settings').length) {
    $('.sidebar-toggle').click(function () {
      collapseSidebar();
    });
  }

  if ($('.theme-settings').length) {
    fixedHeaderCheck.onchange = function () {
      fixedHeader();
    };

    fixedSidebarCheck.onchange = function () {
      fixedSidebar();
    };

    horizontalBarCheck.onchange = function () {
      horizontalBar();
    };

    toggleSidebarCheck.onchange = function () {
      collapseSidebar();
    };

    compactMenuCheck.onchange = function () {
      compactMenu();
    };

    hoverMenuCheck.onchange = function () {
      hoverMenu();
    };

    // Sidebar Toggle
    $('.sidebar-toggle').click(function () {
      toggleSidebarCheck.click();
    });

    // Color changer
    $('.colorbox').click(function () {
      var color = $(this).attr('data-css');
      $('.theme-color').attr('href', 'Resources/css/themes/' + color + '.css');
      return false;
    });

    // Fixed Sidebar Bug
    if (
      !$('body').hasClass('page-sidebar-fixed') &&
      fixedSidebarCheck.checked === 1
    ) {
      $('body').addClass('page-sidebar-fixed');
    }

    if (
      $('body').hasClass('page-sidebar-fixed') &&
      fixedSidebarCheck.checked === 0
    ) {
      $('.fixed-sidebar-check').prop('checked', true);
    }

    // Fixed Header Bug
    if (
      !$('body').hasClass('page-header-fixed') &&
      fixedHeaderCheck.checked === 1
    ) {
      $('body').addClass('page-header-fixed');
    }

    if (
      $('body').hasClass('page-header-fixed') &&
      fixedHeaderCheck.checked === 0
    ) {
      $('.fixed-header-check').prop('checked', true);
    }

    // horizontal bar Bug
    if (
      !$('body').hasClass('page-horizontal-bar') &&
      horizontalBarCheck.checked == 1
    ) {
      $('body').addClass('page-horizontal-bar');
      $('.sidebar').addClass('horizontal-bar');
      $('.sidebar').removeClass('page-sidebar');
    }

    if (
      $('body').hasClass('page-horizontal-bar') &&
      horizontalBarCheck.checked == 0
    ) {
      $('.horizontal-bar-check').prop('checked', true);
    }

    // Toggle Sidebar Bug
    if (
      !$('body').hasClass('small-sidebar') &&
      toggleSidebarCheck.checked == 1
    ) {
      $('body').addClass('small-sidebar');
    }

    if (
      $('body').hasClass('small-sidebar') &&
      toggleSidebarCheck.checked == 0
    ) {
      $('.horizontal-bar-check').prop('checked', true);
    }
  }
}

function bindCommonEvents() {
  $('[rel="close"]').on('click', function (e) {
    closePopup();
  });

  $('[rel="cancel"]').on('click', function (e) {
    goBack();
  });

  $('[rel="back"]').on('click', function (e) {
    goBack();
  });

  //$('[rel="numerics"]').on("keypress", function (e) {
  //    return isIntKey(event);
  //});

  //$('[rel="numerics"]').on("change", function (e) {
  //    onlyNum(this);
  //});
}

function goBack() {
  if (document.referrer && document.referrer.indexOf('/login') === -1) {
    redirectTo(document.referrer);
  } else {
    redirectTo('/');
  }
  ///window.history.go(-1);
  return false;
}

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return mm + '/' + dd + '/' + yyyy;
}

function initToaster() {
  /// https://github.com/CodeSeven/toastr

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'slideDown', //"fadeIn",
    hideMethod: 'slideUp', //"fadeOut"
  };
}

function removeFancyboxScrolls() {
  //top.$('.fancybox-iframe').each(function () { $(this).attr('scrolling', 'no'); });
  top.$('#modal-frame').attr('scrolling', 'no');
}

function redirectTo(url) {
  BlockUI();
  document.location.href = url;
}

function refreshPage() {
  document.location.href = document.location.href;
}

function getQueryStringParam(name) {
  //Ref: http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results == null) return '';
  else return decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function initConfirm() {
  //// http://bootstrap-confirmation.js.org/

  if ($('[data-toggle="confirmation"]').length > 0) {
    $('[data-toggle="confirmation"]').confirmation({
      singleton: 'true',
      popout: 'true',
      btnCancelIcon: '',
      btnOkIcon: '',
    });
  }
}

function setFocus() {
  if ($('[rel="focus"]').length > 0) {
    $('[rel="focus"]').focus();
  }
}

function timeValidation(fromtime, totime) {
  var starttime = new Date('November 13, 2013 ' + fromtime);
  starttime = starttime.getTime();
  var endtime = new Date('November 13, 2013 ' + totime);
  endtime = endtime.getTime();
  if (starttime >= endtime) return false;
  else return true;
}

function dateValidation(todate, fromdate) {
  if (fromdate > todate) {
    showMessage('The Date must be Bigger or Equal to today date', 'warning');
    document.getElementById('txttodate').value = '';
    return false;
  }
  if ((fromdate != '' && todate == '') || (fromdate == '' && todate != '')) {
    showMessage('Invalid date range', 'warning');
    return false;
  }
  return true;
}

function BlockUI() {
  $('#divLoading').show();
}

function UnBlockUI() {
  $('#divLoading').hide();
}

//// execute functions async way
function async(fn, callback) {
  setTimeout(function () {
    if (fn) {
      fn();
    }

    if (callback) {
      callback();
    }
  }, 0);
}

function showMessage(message, msgType) {
  if (!msgType) {
    msgType = 'info';
  }

  // success, error, info, warning
  async(function () {
    Command: toastr[msgType](message);
  });
}

function openPopup(href, width, height, type, onPopupClosed) {
  if (!width) {
    width = ($(window).width() * 90) / 100;
  }

  if (!height) {
    height = ($(window).height() * 95) / 100;
  }

  width = width.toString();
  height = height.toString();

  if (width.indexOf('%') > 0) {
    width = width.replace('%', '');
    width = ($(window).width() * width) / 100;
  }

  if (height.indexOf('%') > 0) {
    height = height.replace('%', '');
    height = ($(window).height() * height) / 100;
  }

  if (!type) {
    type = 'iframe';
  }

  if (type == 'inline') {
    href = '#' + href;
    $inlinePopupDiv = $(href);
    $inlinePopupDiv.show();
  }

  popup = $.modalLink.open(href, {
    height: height,
    width: width,
  });
}

function closeAndOpen(url) {
  closePopup();

  openPopup(url);
}

function closePopup() {
  top.$.modalLink('close');

  if ($inlinePopupDiv) {
    $inlinePopupDiv.hide();
    $inlinePopupDiv = null;
  }
}

function resizePopup(offset) {
  if (!offset) offset = 0;

  var newHeight =
    parseInt($('.page-inner-popup').height() - 25 + offset) + 'px';

  // console.log('resizePopup=' + newHeight);

  ////resize iframe
  top.document.getElementById('modal-frame').style.height = newHeight;
}

function openTemplatePopup(url) {
  sessionStorage.patientId = 19;
  url = url + '?patientId=' + sessionStorage.patientId;
  openPopup(url);
}

function stopPropagation(e) {
  if (!e) e = window.event;

  e.preventDefault();

  //IE9 & Other Browsers
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  //IE8 and Lower
  else {
    e.cancelBubble = true;
  }
}

function ajax(url, callback, data, dataType, async, isGet, isTitleCase) {
  var callType = 'POST';

  if (isGet && isGet === true) callType = 'GET';
  if (!dataType) dataType = 'json';
  if (async == undefined) async = true;
  if (isTitleCase == null || isTitleCase == undefined) isTitleCase = true;

  $.ajax({
    url: apiUrl + url,
    data: JSON.stringify(data),
    type: callType,
    cache: false,
    headers: {
      'cache-control': 'no-cache',
      TenantId: mdlby ? mdlby.tid : 0,
      CurrentUserId: mdlby ? mdlby.uid : 0,
      Authorization: mdlby ? 'Bearer ' + mdlby.jwt : '',
    },
    contentType: 'application/json; charset=utf-8',
    dataType: dataType,
    async: async,
    success: function (data) {
      var isJson = false;
      var isArray = false;

      try {
        isArray = Array.isArray(data);

        var json = JSON.parse(data);
        isJson = true;
      } catch (error) {}

      var dtype = typeof data;

      if (callback && dtype != 'number' && dtype != 'boolean') {
        var x = isTitleCase ? toTitleCase(data) : data;
        callback(x);
      } else {
        callback(data);
      }
    },
    error: function (xhr, status, error) {
      log(url, xhr, status, error);
    },
  });
}

function ajaxGet(url, callback) {
  return ajax(url, callback, null, null, null, true);
}

function toTitleCase(o) {
  var newO, origKey, newKey, value;

  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toTitleCase(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey
        ).toString();

        value = o[origKey];

        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toTitleCase(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

function toCamelCase(o) {
  var newO, origKey, newKey, value;

  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toCamelCase(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();

        value = o[origKey];

        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamelCase(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

function log(url, xhr, status, error) {
  console.log(xhr);
  async(logger.error(xhr, url, error));
}

function removeDom(obj) {
  $(obj).fadeOut('slow', 'swing', function () {
    $(this).remove();
  });
}

function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return year + '-' + month + '-' + day;
}

function isIntKey(evt) {
  if (!evt) {
    evt = window.event;
  }

  var charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
}

function isTimeKey(evt) {
  if (!evt) {
    evt = window.event;
  }

  var charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode != 58 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}

function calculateTotalPages(totalRecords, pageSize) {
  var remainder = totalRecords % pageSize;
  var quotient = Math.floor(totalRecords / pageSize);

  return quotient + (remainder > 0 ? 1 : 0);
}

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}

function bindLazyLoading(data, callback, distanceFromBottom, $element) {
  var isWindow = false;
  if (!$element) {
    isWindow = true;
    $element = $(window);
  }

  totalPages = calculateTotalPages(
    data.length > 0 ? data[0].TotalRecords : 0,
    pageSize
  );
  $element.off('scroll');

  $element.scroll(function () {
    //console.log(pageIndex + '|' + totalPages);
    if (pageIndex < totalPages - 1) {
      var scrollableHeight;

      if (isWindow)
        scrollableHeight = document.body.scrollHeight - $element.height();
      else scrollableHeight = $element.prop('scrollHeight') - $element.height();

      var scrolled = $element.scrollTop() + 15;
      var percentScrolled = (scrolled / scrollableHeight) * 100;
      var percentLeft = 100 - percentScrolled;

      //console.log(scrollableHeight + '|' + scrolled + '|' + percentScrolled + '|' + percentLeft);

      if (percentLeft < 0) return;
      if (percentLeft < distanceFromBottom && !loadingInProgress) {
        pageIndex++;
        if (callback) callback();
      }
    }
  });
}

function openAppointment(
  sourceId,
  patientId,
  patientName,
  selectedMoment,
  appId
) {
  if (!sourceId) sourceId = 0; //dashboard
  if (!patientId) patientId = 0;
  if (!selectedMoment) selectedMoment = '';
  if (!appId) appId = 0;

  sessionStorage.patientId = patientId;
  sessionStorage.sourceId = sourceId;
  sessionStorage.selectedMoment = selectedMoment;
  sessionStorage.appId = appId;

  openPopup('/appointment/create', 1000, 655);
}

function addAppointmentAgenda() {
  openAppointment(22, -1, '', selectedMoment);
}

function editAppointmentAgenda(appId) {
  stopPropagation();

  console.log('editAppointmentAgenda:' + appId);
  var appointment = $(listAppointments).filter(function (i, obj) {
    return obj.AppointmentId === appId;
  })[0];
  sessionStorage.appointment = JSON.stringify(appointment);

  openAppointment(22, -1, '', selectedMoment, appId);
}

function editAppointmentDashboard(appId) {
  stopPropagation();

  console.log('editAppointmentDashboard:' + appId);

  var appointment = $(listUpcomingAppointments).filter(function (i, obj) {
    return obj.AppointmentId === appId;
  })[0];

  sessionStorage.appointment = JSON.stringify(appointment);

  openAppointment(null, null, null, null, appId);
}

function openAppointmentPatient(patientId, patientName) {
  openAppointment(14, patientId, patientName);
}

function applySort(sortField, header) {
  pageIndex = 0;

  if (sortField == sortBy)
    sortOrder = sortOrder == SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC;
  else sortOrder = SORT_ORDER_ASC;

  sortBy = sortField;

  $('.sortIcon').remove();

  if (sortOrder == SORT_ORDER_ASC) {
    $(header).append('<i class="fa fa-caret-up sortIcon"></i>');
  } else {
    $(header).append('<i class="fa fa-caret-down sortIcon"></i>');
  }

  if (sortCallback) sortCallback();
}

function onlyNum(txt) {
  console.log('onlyNum');
  var $this = $(txt);
  $this.val($this.val().replace(/\D/g, ''));
}

function isEnterKey(e) {
  if (!e) {
    e = window.event;
  }

  var keypressed = e.keyCode || e.which;

  // Enter is pressed
  if (keypressed == 13) {
    return true;
  }

  return false;
}

function ellipsis(text, length) {
  if (!length) {
    length = 100;
  }

  if (text.length > length) {
    return (
      '<span title="' + text + '">' + text.substring(0, length) + '...</span>'
    );
  } else {
    return text;
  }
}

function makeHeightSame() {
  setTimeout(function () {
    $('[heightTo]').each(function (obj) {
      var $source = $('#' + $(this).attr('heightTo'));
      if ($source) {
        //console.log('makeHeightSame');

        var heightOffset = $(this).attr('heightOffset');
        if (heightOffset && heightOffset.length > 0) {
          heightOffset = parseInt(heightOffset);
        } else {
          heightOffset = parseInt(0);
        }

        $(this).css('height', parseInt($source.height()) + heightOffset + 'px');
      }
    });
  }, 5);
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function htmlToRtf(html) {
  var result = '';

  ajax(
    '/api/utility/HtmlToRtf',
    function (d) {
      if (d.length > 0) {
        result = d;
      }
    },
    html,
    null,
    false,
    null
  );

  return result;
}

function rtfToHtml(rtf) {
  var result = '';

  ajax(
    '/api/utility/RtfToHtml',
    function (d) {
      if (d.length > 0) {
        result = d;
      }
    },
    rtf,
    null,
    false,
    null
  );

  return result;
}

function onEnterPressNg(btnId) {
  var e = window.event;
  var keypressed = e.keyCode || e.which;

  // Enter is pressed
  if (keypressed == 13 && btnId) {
    $('#' + btnId).click();
  }
  return true;
}


