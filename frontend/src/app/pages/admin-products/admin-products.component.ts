import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import { Product, ProductVariant } from '../../core/models';
import { ProductService } from '../../core/product.service';
import { AdminShellComponent } from '../../shared/layout/admin-shell.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ImageUrlPipe, AdminShellComponent],
  template: `
    <app-admin-shell title="Productos">
      <div class="admin-grid products-grid">
        <form class="admin-card product-form-card" [formGroup]="form" (ngSubmit)="submit()">
          <div class="admin-card-head">
            <div>
              <span>Inventario</span>
              <h2>{{ editing ? 'Editar producto' : 'Nuevo producto' }}</h2>
            </div>
            <button class="btn btn-dark btn-sm" type="submit" [disabled]="form.invalid || loading">
              <i class="bi bi-save"></i> Guardar
            </button>
          </div>

          @if (message) {
            <div class="alert alert-success">{{ message }}</div>
          }
          @if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          }

          <div class="row g-3">
            <div class="col-md-7">
              <label class="form-label">Nombre</label>
              <input class="form-control" formControlName="name">
            </div>
            <div class="col-md-5">
              <label class="form-label">Marca</label>
              <select class="form-select" formControlName="brand">
                @for (brand of brands; track brand) {
                  <option [value]="brand">{{ brand }}</option>
                }
              </select>
            </div>
            <div class="col-12">
              <label class="form-label">Descripción</label>
              <textarea class="form-control" rows="3" formControlName="description"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label">Categoría</label>
              <select class="form-select" formControlName="category">
                <option value="" disabled>Selecciona una categoría</option>
                @for (category of categories; track category) {
                  <option [value]="category">{{ category }}</option>
                }
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Precio compra base</label>
              <input class="form-control" type="number" min="0" formControlName="purchasePrice">
            </div>
            <div class="col-md-3">
              <label class="form-label">Precio venta base</label>
              <input class="form-control" type="number" min="0" formControlName="salePrice">
            </div>
            <div class="col-md-4">
              <label class="form-label">Stock total</label>
              <input class="form-control" type="number" min="0" formControlName="stock">
            </div>
            <div class="col-md-4">
              <label class="form-label">Umbral mínimo</label>
              <input class="form-control" type="number" min="0" formControlName="minimumStock">
            </div>
            <div class="col-md-4">
              <label class="form-label">Imagen</label>
              <input class="form-control" type="file" accept="image/*" (change)="selectImage($event)">
            </div>
            <div class="col-md-6">
              <label class="form-label">Talla principal</label>
              <select class="form-select" formControlName="size">
                <option value="">Varias tallas</option>
                @for (size of sizes; track size) {
                  <option [value]="size">{{ size }}</option>
                }
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Color principal</label>
              <select class="form-select" formControlName="color">
                <option value="">Varios colores</option>
                @for (color of colors; track color) {
                  <option [value]="color">{{ color }}</option>
                }
              </select>
            </div>
            <div class="col-12 form-check ms-2">
              <input class="form-check-input" type="checkbox" id="active" formControlName="active">
              <label class="form-check-label" for="active">Producto activo</label>
            </div>
            <div class="col-12 form-check ms-2">
              <input class="form-check-input" type="checkbox" id="featured" formControlName="featured">
              <label class="form-check-label" for="featured">Es un producto destacado</label>
            </div>
          </div>

          <div class="variant-section">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span class="admin-kicker">Variantes</span>
                <h3>Tallas, colores y precios</h3>
              </div>
              <button class="btn btn-outline-dark btn-sm" type="button" (click)="addVariant()">
                <i class="bi bi-plus-lg"></i> Agregar variante
              </button>
            </div>

            <div formArrayName="variants" class="variant-list">
              @if (variantForms().controls.length) {
                <div class="variant-row variant-header">
                  <span>SKU</span>
                  <span>Talla</span>
                  <span>Color</span>
                  <span>Precio cost.</span>
                  <span>Precio venta</span>
                  <span>Stock</span>
                  <span></span>
                </div>
              }
              @for (variant of variantForms().controls; track $index; let index = $index) {
                <div class="variant-row" [formGroupName]="index">
                  <input class="form-control" placeholder="SKU" formControlName="sku">
                  <select class="form-select" formControlName="size">
                    <option value="" disabled>Talla</option>
                    @for (size of sizes; track size) {
                      <option [value]="size">{{ size }}</option>
                    }
                  </select>
                  <select class="form-select" formControlName="color">
                    <option value="" disabled>Color</option>
                    @for (color of colors; track color) {
                      <option [value]="color">{{ color }}</option>
                    }
                  </select>
                  <input class="form-control" type="number" min="0" placeholder="Compra" formControlName="purchasePrice">
                  <input class="form-control" type="number" min="0" placeholder="Venta" formControlName="salePrice">
                  <input class="form-control" type="number" min="0" placeholder="Stock" formControlName="stock">
                  <button class="btn btn-outline-danger btn-sm" type="button" (click)="removeVariant(index)" title="Quitar variante">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              } @empty {
                <div class="admin-empty">Agrega variantes si este producto cambia por talla, color o precio.</div>
              }
            </div>
          </div>

          <button class="btn btn-outline-secondary mt-3" type="button" (click)="reset()">Limpiar formulario</button>
        </form>

        <section class="admin-card">
          <div class="admin-card-head">
            <div>
              <span>Stock actual</span>
              <h2>{{ products.length }} productos</h2>
            </div>
          </div>
          <div class="admin-inventory-list">
            @for (product of products; track product.id) {
              <article class="admin-product-row" [class.low-stock]="product.stock <= product.minimumStock">
                <img [src]="product.imageUrl | imageUrl" [alt]="product.name">
                <div>
                  <strong>{{ product.name }}</strong>
                  <p>{{ product.category }} · {{ product.brand }} · {{ product.variants.length }} variantes</p>
                  <small>Stock {{ product.stock }} / mínimo {{ product.minimumStock }} · S/ {{ product.salePrice }}</small>
                </div>
                <span class="admin-featured" [class.off]="!product.featured">{{ product.featured ? 'Destacado' : 'Normal' }}</span>
                <span class="admin-status" [class.off]="!product.active">{{ product.active ? 'Activo' : 'Oculto' }}</span>
                <button class="btn btn-outline-danger btn-sm" type="button" (click)="edit(product)" title="Editar">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" type="button" (click)="remove(product.id)" title="Desactivar">
                  <i class="bi bi-trash"></i>
                </button>
              </article>
            }
          </div>
        </section>
      </div>
    </app-admin-shell>
  `
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  editing?: Product;
  selectedImage?: File;
  loading = false;
  message = '';
  error = '';
  categories = ['Zapatillas', 'Deportes', 'Ropa Urbana', 'Accesorios', 'Polos', 'Casacas', 'Pantalones', 'Shorts'];
  brands = ['Athletix', 'Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42', '43', '44'];
  colors = ['Negro', 'Blanco', 'Gris', 'Azul', 'Rojo', 'Verde', 'Amarillo', 'Blanco/Negro', 'Azul/Negro'];

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    brand: ['Athletix', [Validators.required]],
    purchasePrice: [0, [Validators.required, Validators.min(0)]],
    salePrice: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    minimumStock: [5, [Validators.required, Validators.min(0)]],
    size: [''],
    color: [''],
    active: [true],
    featured: [false],
    variants: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  variantForms(): FormArray {
    return this.form.controls.variants as FormArray;
  }

  addVariant(variant?: ProductVariant): void {
    this.variantForms().push(this.fb.group({
      sku: [variant?.sku ?? ''],
      size: [variant?.size ?? '', [Validators.required]],
      color: [variant?.color ?? '', [Validators.required]],
      purchasePrice: [variant?.purchasePrice ?? this.form.value.purchasePrice ?? 0, [Validators.required, Validators.min(0)]],
      salePrice: [variant?.salePrice ?? this.form.value.salePrice ?? 0, [Validators.required, Validators.min(0)]],
      stock: [variant?.stock ?? 0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeVariant(index: number): void {
    this.variantForms().removeAt(index);
  }

  load(): void {
    this.productService.adminProducts().subscribe((products) => this.products = products);
  }

  selectImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedImage = input.files?.[0];
  }

  edit(product: Product): void {
    this.editing = product;
    this.message = '';
    this.error = '';
    this.variantForms().clear();
    this.form.patchValue({
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      stock: product.stock,
      minimumStock: product.minimumStock,
      size: product.size ?? '',
      color: product.color ?? '',
      active: product.active,
      featured: product.featured
    });
    product.variants.forEach((variant) => this.addVariant(variant));
  }

  reset(): void {
    this.editing = undefined;
    this.selectedImage = undefined;
    this.message = '';
    this.error = '';
    this.variantForms().clear();
    this.form.reset({
      name: '',
      description: '',
      category: '',
      brand: 'Athletix',
      purchasePrice: 0,
      salePrice: 0,
      stock: 0,
      minimumStock: 5,
      size: '',
      color: '',
      active: true,
      featured: false
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    const value = this.form.getRawValue();
    formData.append('name', value.name ?? '');
    formData.append('description', value.description ?? '');
    formData.append('category', value.category ?? '');
    formData.append('brand', value.brand ?? '');
    formData.append('purchasePrice', String(value.purchasePrice ?? 0));
    formData.append('salePrice', String(value.salePrice ?? 0));
    formData.append('stock', String(value.stock ?? 0));
    formData.append('minimumStock', String(value.minimumStock ?? 0));
    formData.append('size', value.size ?? '');
    formData.append('color', value.color ?? '');
    formData.append('active', String(value.active ?? true));
    formData.append('featured', String(value.featured ?? false));
    formData.append('variantsJson', JSON.stringify(value.variants ?? []));
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

  remove(id: number): void {
    this.productService.delete(id).subscribe(() => this.load());
  }
}
