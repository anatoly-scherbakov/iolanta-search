let token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnlldGktcmVhZG9' +
    'ubHkiLCJpc3MiOiJhZ2VudDp5ZXRpLXJlYWRvbmx5Ojo1Y2Q4YmE5Zi01ZGQ2LTQ4MWU' +
    'tOWUxOC04NTIwYjIxN2I0Y2QiLCJpYXQiOjE1NTYyMDcwMjUsInJvbGUiOlsidXNlcl9' +
    'hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSw' +
    'ic2FtbCI6e319.-7tuD6sdMhjEADykZ0QoMWAUfoXcHXlkpS3KRmLtN465A6wuK2fVtu' +
    '4y3OO2kqRcPZRkUMUGzAEi_LmCy5uQQQ';

class CategoriesMenu extends HTMLElement {
    constructor() {
        super();

        this.query_id = this.getAttribute('query_id');

        this.update();
    }

    fetch() {
        return new Iolanta(token).execute_stored_query(this.query_id);
    }

    html(context) {
        return _.template(`
            <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
            
            <div id="menu" class="ui vertical menu">
                <div class="item"><strong>Categories</strong></div>
                <%
                    _.each(categories, function(item, key, list) {
                %>
                    <a class="item" href="#<%= item %>"><%= item.capitalize() %></a>
                <%
                    });
                %>
            </div>
        `)(context);
    }

    render(data) {
        if (!this.shadow) {
            this.shadow = this.attachShadow({mode: 'open'});
        }

        data = data.map((datum) => datum.category);

        this.shadow.innerHTML = this.html({categories: data});

        this.shadow.getElementById('menu').onclick = this.onClick.bind(this);
    }

    onClick(event) {
        let element = event.target;

        if (element.tagName !== 'a') {
            return
        }

        let href = element.getAttribute('href');

        this.goto(href);
    }

    update() {
        this.fetch().then(
            this.render.bind(this)
        )
    }
}

customElements.define('categories-menu', CategoriesMenu);