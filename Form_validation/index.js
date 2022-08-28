function Validator(formSelector, options) {
  //gán giá trị mặc định cho tham số khi định nghĩa(ES5)

  if (!options) {
    options = {};
  }
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var formRules = {};

  //quy ước tạo rules
  //nếu có lõi thì return lại error mess
  //nếu không có lỗi thì return undefined
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "vui long nhap lai";
    },

    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "vui long nhap lai";
    },

    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `vui long nhap du ${min} ki tu`;
      };
    },

    max: function (max) {
      return function (value) {
        return value.length <= max
          ? undefined
          : ` vui long nhap du ${max} ki tu`;
      };
    },
  };

  //lấy ra formelement trong DOM theo formselector
  var formElement = document.querySelector(formSelector);

  //chỉ xử lí khi có element trong DOM
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");

    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");

      for (var rule of rules) {
        var ruleInfo;
        var isRuleHasValue = rule.includes(":");

        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }

        var ruleFunc = validatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }
      //lắng nghe sự kiện để validate
      input.onblur = handleValidate;
      input.oninput = hanldeClearError;
    }

    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;

      rules.find(function (rule) {
        errorMessage = rule(event.target.value);
        return errorMessage;
      });

      //nếu có lỗi thì hiển thị ra mess looix
      if (errorMessage) {
        var formGoup = getParent(event.target, ".form-group");
        if (formGoup) {
          formGoup.classList.add("invalid");
          var formMessage = formGoup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }

      return !errorMessage;
    }

    //hàm clear message lỗi
    function hanldeClearError(event) {
      var formGoup = getParent(event.target, ".form-group");
      if (formGoup.classList.contains("invalid")) {
        formGoup.classList.remove("invalid");
        var formMessage = formGoup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
  }

  //xử lí hành vi submit form
  formElement.onsubmit = function (event) {
    event.preventDefault();

    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;

    for (var input of inputs) {
      if (!handleValidate({ target: input })) {
        isValid = false;
      }
    }

    //khi không có lỗi thì submit form
    if (isValid) {
      if (typeof options.onSubmit === "function") {
        options.onSubmit();
      } else {
        formElement.submit();
      }
    }
  };
}

Validator("#register-form");
