/**
* PHP Email Form Validation - v2.3
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
!(function($) {
  "use strict";

  $('.php-email-form').submit(function(e) {
    e.preventDefault();
    
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    if ( $(this).data('recaptcha-site-key') ) {
      var recaptcha_site_key = $(this).data('recaptcha-site-key');
      grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha_site_key, {action: 'php_email_form_submit'}).then(function(token) {
          php_email_form_submit(this_form,action,this_form.serialize() + '&recaptcha-response=' + token);
        });
      });
    } else {
      php_email_form_submit(this_form,action,this_form.serialize());
    }
    
    return true;
  });

  function php_email_form_submit(this_form, action, data) {

    var fakeURL = "http://www.example.com?" +  data;
    var createURL = new URL(fakeURL);


          var formData = new FormData(this);
          formData.append('service_id', 'service_t4hgp5o');
          formData.append('template_id', 'template_g42efpq');
          formData.append('user_id', 'user_TDsE2a5sRgkz4mEf5tm5d');
          formData.append('email', createURL.searchParams.get('email'));
          formData.append('name', createURL.searchParams.get('name'));
          formData.append('subject', createURL.searchParams.get('subject'));
          formData.append('message', createURL.searchParams.get('message'));

          $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
              type: 'POST',
              data: formData,
              contentType: false, // auto-detection
              processData: false // no need to parse formData to string
          }).done(function() {
              this_form.find('.loading').slideUp();
              this_form.find('.sent-message').slideDown();
              this_form.find("input:not(input[type=submit]), textarea").val('');
          }).fail(function(error) {
              this_form.find('.loading').slideUp();
              var msg = 'Form submission failed. <br>';
              this_form.find('.error-message').slideDown().html(msg);
          });

//     console.log(createURL.searchParams.get('email'));
//     Email.send({
//       Host: "smtp.gmail.com",
//       Username: "enhanzerp@gmail.com",
//       Password: "enhanzer1999&",
//       To : 'info@enhanzer.com',
//       From : createURL.searchParams.get('email') ,
//       Subject : " CRM Web Inquiry",
//       Body : "Subject : " +createURL.searchParams.get('subject')  + " from " + createURL.searchParams.get('name')+ " /n " +createURL.searchParams.get('message')
//     }) .then( message => {
//       console.log(message);
//       if( response === 'OK' ) {
//         this_form.find('.loading').slideUp();
//         this_form.find('.sent-message').slideDown();
//         this_form.find("input:not(input[type=submit]), textarea").val('');
//       } else {
//         this_form.find('.loading').slideUp();
//
//          var msg = 'Form submission failed and no error message returned <br>';
//
//         this_form.find('.error-message').slideDown().html(msg);
//       }
//     }).then(data => {
//       console.log(data);
//       var error_msg = "Form submission failed!<br>";
//       if(data.statusText || data.status) {
//         error_msg += 'Status:';
//         if(data.statusText) {
//           error_msg += ' ' + data.statusText;
//         }
//         if(data.status) {
//           error_msg += ' ' + data.status;
//         }
//         error_msg += '<br>';
//       }
//       if(data.responseText) {
//         error_msg += data.responseText;
//       }
//       this_form.find('.loading').slideUp();
//       this_form.find('.error-message').slideDown().html(error_msg);
//     });
    }
})(jQuery);
