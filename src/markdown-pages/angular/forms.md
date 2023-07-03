---
title: Angular Forms
date: 2023-01-13
tags:
  - ui
  - framework
  - angular
---

## Reactive Forms

## Custom Validators

- [Adding Integrated Validation to Custom Form Controls in Angular](https://netbasal.com/adding-integrated-validation-to-custom-form-controls-in-angular-dc55e49639ae)
- [The best way to implement custom validators](https://indepth.dev/posts/1319/the-best-way-to-implement-custom-validators)
- [Add validation to Angular material disabled field](https://stackoverflow.com/questions/54533202/add-validation-to-angular-material-disabled-field)
- [Angular Custom Form Validators: Complete Guide](https://blog.angular-university.io/angular-custom-validators/)
- [Adding Integrated Validation to Custom Form Controls in Angular](https://netbasal.com/adding-integrated-validation-to-custom-form-controls-in-angular-dc55e49639ae)

## Control Value Accessor

### Use Case

- Non-native form control elements
- Custom styling / functionality
- Control wrapped with related elements
- Parser / formatter directives

### References

- [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)
- [Never again be confused when implementing ControlValueAccessor in Angular forms](https://indepth.dev/posts/1055/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms)
- [Kara Erickson's AngularConnect 2017 talk](https://www.youtube.com/watch?v=CD_t3m2WMM8)
- [Custom Material control example and details](https://material.angular.io/guide/creating-a-custom-form-field-control#form-field-custom-control)
- [Working with Angular forms in an enterprise environment](https://timdeschryver.dev/blog/working-with-angular-forms-in-an-enterprise-environment#input-form-fields)
- [The Control Value Accessor | Jennifer Wadella](https://www.youtube.com/watch?v=kVbLSN0AW-Y)
- [Understanding Angular's Control Value Accessor Interface](https://jenniferwadella.com/blog/understanding-angulars-control-value-accessor-interface)
- [Galaxy Rating App](https://github.com/tehfedaykin/galaxy-rating-app)
- [How to PROPERLY implement ControlValueAccessor - Angular Form](https://blog.woodies11.dev/how-to-properly-implement-controlvalueaccessor/)
- [Angular Custom Form Controls: Complete Guide](https://blog.angular-university.io/angular-custom-form-controls/)

### Details of CVA (Control Value Accessor)

`writeValue`: called when the form control is instantiated, when setValue, or patchValue are called. Called when programatic changes from model to view are called (outside CVA)

`registerOnChange(fn)`: let the parent know a value changed. e.g. `name.valueChanges.subscribe` on the parent. onChange is called when the CVA needs to propagate view to model changes upward.

`registerOnTouched(fn)`: let the parent know a component was interacted with, like validation. e.g. `name.touched` on the parent. Adds the class 'ng-touched'

`setDisabledState`: _optional_ called when the form is instantiated if the disabled key is present and when .enabled() or .disabled() are called.

#### Tips (from Jennifer's talk)

- Keep wrapper components dumb
- Just input/output form values
- Leave validation logic to the parent form component
- CVA can be used with any form API


### Implementation

1.  Add a lookup to the NgControl to the custructor of your custom control. 

    **NOTE**: Alternate approach is using [`NG_VALUE_ACCESSOR`](https://indepth.dev/posts/1055/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms#implementing-custom-value-accessor)

    ```typescript
    // @Optional is required for unit testing to work
    constructor(@Optional() @Self() public controlDir: NgControl) {
        controlDir.valueAccessor = this;
    }
    ```

1.  Implement the ControlValueAccessor interface

    ```typescript
    @Component({
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
      providers: [],
      selector: "my-custom-field",
      styleUrls: ["./my-custom-field.component.scss"],
      templateUrl: "./my-custom-field.component.html",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
    })
    export class MyCustomFieldComponent
      implements ControlValueAccessor, OnInit
    {
      disabled: boolean;
      // if you need special handling use a getter/setter
      _value: string;
      // ... constructor from first step

      onChanged = (v: string): void => {}
      onTouched = (): void => {}

      writeValue(obj: any): void {
        this._value = value;
      }

      registerOnChange(fn: (v: string) => void): void {
        this.onChanged = fn;
      }

      registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
      }

      setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
      }

      sweetChange($event) {
        this.onTouched();
        this.onChanged($event.currentTarget.value)
      }
    }
    ```

    ```html
    <input (change)="sweetChange($event)" type="text" />
    ```

1.  To add validators to custom field

    ```typescript
    ngOnInit(): void {
        const control = this.controlDir.control
        let validators = control.validator
          ? [control.validator, Validators.required]
          : Validators.required
        control.setValidators(validators)
        control.updateValueAndValidity()
    }
    ```

1.  Bind to the reactive form with `formControlName` and configuring a formGroup.

    ```html
    <form [formGroup]="myForm">
      <my-custom-field formControlName="dynamicText"></my-custom-field>
    </form>
    ```

    ```typescript
    @Component({
        standalone: true,
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MyCustomFieldComponent
        ],
        selector: 'my-form',
        styleUrls: ['./my-form.component.scss'],
        templateUrl: './my-form.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
    })
    export class MyFormComponent implements OnInit {
        myForm: FormGroup;

        constructor(private fb: FormBuilder) {}

        ngOnInit() {
            this.myForm: FormGroup = this.formBuilder.group(
            {
                name: ['', [Validators.required]],
                dynamicText: ['', [Validators.required]]
            },
            { validators: customFormValidator }
        }
    }
    ```

### Issues

#### Infinite loop with writeValue and set value

- Don't call onChange from the value setter



- [How to PROPERLY implement ControlValueAccessor - Angular Form](https://blog.woodies11.dev/how-to-properly-implement-controlvalueaccessor/)
- [Why do I need call onChange and onTouch in writeValue when implementing ControlValueAccessor in Angular?](https://stackoverflow.com/a/46743580/3195475)

## Composition

- https://tomastrajan.medium.com/angular-reactive-sub-forms-type-safe-without-duplication-dbd24225e1e8
- https://medium.com/angular-in-depth/reducing-the-forms-boilerplate-make-your-angular-forms-reusable-ee06d7c07f47
