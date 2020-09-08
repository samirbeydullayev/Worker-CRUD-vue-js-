import { required, confirmed, length, email,min } from "vee-validate/dist/rules";
import { extend,configure } from "vee-validate";



// configure vasitesile valid ve invalid taglarina isdediyiniz clasi vere bilersiniz
// providere-classes elave edirik
// ve bu inputu saxlayan form-groupa-ise 'classes' bind edirik
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  }
})

// bura istifade etdiklerimizi yaziriq wablonlari
// amma customda elave elemek olur
extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("confirmed", {
  ...confirmed,
  message: "This field confirmation does not match"
});

extend("length", {
  ...length,
  message: "This field must have {length} options"
});


extend("min", {
  ...min,
  message: "This field minimum must have '{length}' character"
});
