import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/product.service";
const _forTrack0 = ($index, $item) => $item.id;
function AdminProductsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
function AdminProductsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function AdminProductsComponent_For_76_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 36);
    i0.ɵɵelement(1, "img", 37);
    i0.ɵɵpipe(2, "imageUrl");
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 38);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 39);
    i0.ɵɵlistener("click", function AdminProductsComponent_For_76_Template_button_click_10_listener() { const product_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.edit(product_r3)); });
    i0.ɵɵelement(11, "i", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 41);
    i0.ɵɵlistener("click", function AdminProductsComponent_For_76_Template_button_click_12_listener() { const product_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.remove(product_r3.id)); });
    i0.ɵɵelement(13, "i", 42);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const product_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(2, 11, product_r3.imageUrl), i0.ɵɵsanitizeUrl)("alt", product_r3.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(product_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", product_r3.category, " \u00B7 S/ ", product_r3.salePrice, " \u00B7 ", product_r3.stock, " uds");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("text-bg-success", product_r3.active)("text-bg-secondary", !product_r3.active);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", product_r3.active ? "Activo" : "Oculto", " ");
} }
export class AdminProductsComponent {
    constructor(fb, productService) {
        this.fb = fb;
        this.productService = productService;
        this.products = [];
        this.loading = false;
        this.message = '';
        this.error = '';
        this.form = this.fb.nonNullable.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            category: ['', [Validators.required]],
            brand: ['Athletix', [Validators.required]],
            purchasePrice: [0, [Validators.required, Validators.min(0)]],
            salePrice: [0, [Validators.required, Validators.min(0)]],
            stock: [0, [Validators.required, Validators.min(0)]],
            size: [''],
            color: [''],
            active: [true]
        });
    }
    ngOnInit() {
        this.load();
    }
    load() {
        this.productService.adminProducts().subscribe((products) => this.products = products);
    }
    selectImage(event) {
        const input = event.target;
        this.selectedImage = input.files?.[0];
    }
    edit(product) {
        this.editing = product;
        this.message = '';
        this.error = '';
        this.form.patchValue(product);
    }
    reset() {
        this.editing = undefined;
        this.selectedImage = undefined;
        this.form.reset({ brand: 'Athletix', purchasePrice: 0, salePrice: 0, stock: 0, active: true });
    }
    submit() {
        if (this.form.invalid) {
            return;
        }
        const formData = new FormData();
        const value = this.form.getRawValue();
        Object.entries(value).forEach(([key, raw]) => formData.append(key, String(raw ?? '')));
        if (this.selectedImage) {
            formData.append('image', this.selectedImage);
        }
        this.loading = true;
        this.error = '';
        this.productService.save(formData, this.editing?.id).subscribe({
            next: () => {
                this.message = this.editing ? 'Producto actualizado.' : 'Producto creado.';
                this.loading = false;
                this.reset();
                this.load();
            },
            error: (err) => {
                this.error = err.error?.message ?? 'No se pudo guardar el producto';
                this.loading = false;
            }
        });
    }
    remove(id) {
        this.productService.delete(id).subscribe(() => this.load());
    }
    static { this.ɵfac = function AdminProductsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminProductsComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ProductService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminProductsComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 77, vars: 5, consts: [[1, "page-head", "admin-head"], [1, "container"], [1, "eyebrow"], ["routerLink", "/admin", 1, "btn", "btn-outline-light"], [1, "bi", "bi-arrow-left"], [1, "section-pad", "pt-4"], [1, "row", "g-4"], [1, "col-lg-5"], [1, "form-panel", 3, "ngSubmit", "formGroup"], [1, "alert", "alert-success"], [1, "alert", "alert-danger"], [1, "row", "g-3"], [1, "col-12"], [1, "form-label"], ["formControlName", "name", 1, "form-control"], ["rows", "3", "formControlName", "description", 1, "form-control"], [1, "col-md-6"], ["formControlName", "category", 1, "form-control"], ["formControlName", "brand", 1, "form-control"], ["type", "number", "min", "0", "formControlName", "purchasePrice", 1, "form-control"], ["type", "number", "min", "0", "formControlName", "salePrice", 1, "form-control"], [1, "col-md-4"], ["type", "number", "min", "0", "formControlName", "stock", 1, "form-control"], ["formControlName", "size", 1, "form-control"], ["formControlName", "color", 1, "form-control"], ["type", "file", "accept", "image/*", 1, "form-control", 3, "change"], [1, "col-12", "form-check", "ms-2"], ["type", "checkbox", "id", "active", "formControlName", "active", 1, "form-check-input"], ["for", "active", 1, "form-check-label"], [1, "d-flex", "gap-2", "mt-3"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "bi", "bi-save"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "col-lg-7"], [1, "list-panel"], [1, "panel-title"], [1, "inventory-row"], [3, "src", "alt"], [1, "badge"], ["type", "button", "title", "Editar", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], [1, "bi", "bi-pencil"], ["type", "button", "title", "Desactivar", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"]], template: function AdminProductsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Inventario");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Productos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Crea productos con imagen, stock, precio de compra y venta.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "a", 3);
            i0.ɵɵelement(9, "i", 4);
            i0.ɵɵtext(10, " Volver");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "section", 5)(12, "div", 1)(13, "div", 6)(14, "div", 7)(15, "form", 8);
            i0.ɵɵlistener("ngSubmit", function AdminProductsComponent_Template_form_ngSubmit_15_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(16, "h2");
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, AdminProductsComponent_Conditional_18_Template, 2, 1, "div", 9)(19, AdminProductsComponent_Conditional_19_Template, 2, 1, "div", 10);
            i0.ɵɵelementStart(20, "div", 11)(21, "div", 12)(22, "label", 13);
            i0.ɵɵtext(23, "Nombre");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(24, "input", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 12)(26, "label", 13);
            i0.ɵɵtext(27, "Descripci\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "textarea", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 16)(30, "label", 13);
            i0.ɵɵtext(31, "Categor\u00EDa");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 16)(34, "label", 13);
            i0.ɵɵtext(35, "Marca");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "input", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 16)(38, "label", 13);
            i0.ɵɵtext(39, "Precio compra");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "input", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 16)(42, "label", 13);
            i0.ɵɵtext(43, "Precio venta");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "input", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 21)(46, "label", 13);
            i0.ɵɵtext(47, "Stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(48, "input", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 21)(50, "label", 13);
            i0.ɵɵtext(51, "Talla");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(52, "input", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 21)(54, "label", 13);
            i0.ɵɵtext(55, "Color");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(56, "input", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 12)(58, "label", 13);
            i0.ɵɵtext(59, "Imagen");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "input", 25);
            i0.ɵɵlistener("change", function AdminProductsComponent_Template_input_change_60_listener($event) { return ctx.selectImage($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "div", 26);
            i0.ɵɵelement(62, "input", 27);
            i0.ɵɵelementStart(63, "label", 28);
            i0.ɵɵtext(64, "Producto activo");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(65, "div", 29)(66, "button", 30);
            i0.ɵɵelement(67, "i", 31);
            i0.ɵɵtext(68, " Guardar ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "button", 32);
            i0.ɵɵlistener("click", function AdminProductsComponent_Template_button_click_69_listener() { return ctx.reset(); });
            i0.ɵɵtext(70, "Limpiar");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(71, "div", 33)(72, "div", 34)(73, "h2", 35);
            i0.ɵɵtext(74, "Stock actual");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(75, AdminProductsComponent_For_76_Template, 14, 13, "article", 36, _forTrack0);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.editing ? "Editar producto" : "Nuevo producto");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.message ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error ? 19 : -1);
            i0.ɵɵadvance(47);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.products);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink, ImageUrlPipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminProductsComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [ReactiveFormsModule, RouterLink, ImageUrlPipe],
                template: `
    <section class="page-head admin-head">
      <div class="container">
        <span class="eyebrow">Inventario</span>
        <h1>Productos</h1>
        <p>Crea productos con imagen, stock, precio de compra y venta.</p>
        <a routerLink="/admin" class="btn btn-outline-light"><i class="bi bi-arrow-left"></i> Volver</a>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <form class="form-panel" [formGroup]="form" (ngSubmit)="submit()">
              <h2>{{ editing ? 'Editar producto' : 'Nuevo producto' }}</h2>
              @if (message) {
                <div class="alert alert-success">{{ message }}</div>
              }
              @if (error) {
                <div class="alert alert-danger">{{ error }}</div>
              }
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Nombre</label>
                  <input class="form-control" formControlName="name">
                </div>
                <div class="col-12">
                  <label class="form-label">Descripción</label>
                  <textarea class="form-control" rows="3" formControlName="description"></textarea>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Categoría</label>
                  <input class="form-control" formControlName="category">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Marca</label>
                  <input class="form-control" formControlName="brand">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Precio compra</label>
                  <input class="form-control" type="number" min="0" formControlName="purchasePrice">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Precio venta</label>
                  <input class="form-control" type="number" min="0" formControlName="salePrice">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Stock</label>
                  <input class="form-control" type="number" min="0" formControlName="stock">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Talla</label>
                  <input class="form-control" formControlName="size">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Color</label>
                  <input class="form-control" formControlName="color">
                </div>
                <div class="col-12">
                  <label class="form-label">Imagen</label>
                  <input class="form-control" type="file" accept="image/*" (change)="selectImage($event)">
                </div>
                <div class="col-12 form-check ms-2">
                  <input class="form-check-input" type="checkbox" id="active" formControlName="active">
                  <label class="form-check-label" for="active">Producto activo</label>
                </div>
              </div>
              <div class="d-flex gap-2 mt-3">
                <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading">
                  <i class="bi bi-save"></i> Guardar
                </button>
                <button class="btn btn-outline-secondary" type="button" (click)="reset()">Limpiar</button>
              </div>
            </form>
          </div>
          <div class="col-lg-7">
            <div class="list-panel">
              <h2 class="panel-title">Stock actual</h2>
              @for (product of products; track product.id) {
                <article class="inventory-row">
                  <img [src]="product.imageUrl | imageUrl" [alt]="product.name">
                  <div>
                    <strong>{{ product.name }}</strong>
                    <p>{{ product.category }} · S/ {{ product.salePrice }} · {{ product.stock }} uds</p>
                  </div>
                  <span class="badge" [class.text-bg-success]="product.active" [class.text-bg-secondary]="!product.active">
                    {{ product.active ? 'Activo' : 'Oculto' }}
                  </span>
                  <button class="btn btn-outline-primary btn-sm" type="button" (click)="edit(product)" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" type="button" (click)="remove(product.id)" title="Desactivar">
                    <i class="bi bi-trash"></i>
                  </button>
                </article>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ProductService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminProductsComponent, { className: "AdminProductsComponent" }); })();
//# sourceMappingURL=admin-products.component.js.map