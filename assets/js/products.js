class Product{
    constructor(){
        this.events();
        this.readData();
        
        this.data = null;
        this.modal = $('#single-product');
        this.id = null;
        this.imagePath = 'assets/images/ferox/products/';
    }

    // Events
    events(){
        $('.view-product').on('click', this.showProduct.bind(this));
        $('#single-product').on('hide.bs.modal', this.clear.bind(this));
    }

    // Methods
    readData(){
        $.ajax({
            dataType: "json",
            url: '../../products.json',
            success: (resp) => {
                this.data = resp
            }
          });
    }

    showProduct(e){
        const id = $(e.target).data('id');
        this.id = id;


        if(this.data){
            const product = $.map(this.data, function(obj){
                if(obj.id == id){
                    return obj;
                }
            });

            console.log(product);
            
            this.modal.find('.product-image').html(`<img src="${this.imagePath + id}.png" class="img-fluid" />`);
            this.modal.find('.product-title').html(`<h5>${product[0].name}</h5>`);
            if(id != 1){
                this.modal.find('.product-desc').html(`<p>${product[0].description}</p>`);
                this.modal.find('.product-features').html(`
                    <table class="table table-bordered" id="prod-features">
                        <tbody>
                            ${this.listFeatures(product[0].features)}
                        </tbody>
                    </table>
                `);
            } else {
                this.modal.find('.product-features').html(`<p class="p-3">${product[0].description}</p>`);
            }
            this.modal.modal('show');
        }
    }

    listFeatures(features){
        if(features && features.length > 0){
            return features.map(feature => {
               return  `
                <tr>
                    <th width="100">${feature.key}</th>
                    <td>${feature.value}</td>
                </tr>
                `;
            }).join("");
        } else {
            return '<tr><td>No data!</td></tr>';
        }
    }

    clear(){
        this.modal.find('.product-image').html('');
        this.modal.find('.product-title').html('');
        this.modal.find('.product-desc').html('');
        this.modal.find('.product-features').html('');
    }
}

new Product();