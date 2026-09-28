/* =========================================
   SLOKKA FRONTEND
========================================= */


/* ===============================
   SAMPLE DATA
=============================== */

const listings = [

  {
    id: 1,
    name: "Sample Profile 01",
    city: "Melbourne",
    category: "Escorts"
  },

  {
    id: 2,
    name: "Sample Profile 02",
    city: "Sydney",
    category: "Transsexual"
  },

  {
    id: 3,
    name: "Sample Profile 03",
    city: "Canberra",
    category: "Male Escorts"
  },

  {
    id: 4,
    name: "Sample Profile 04",
    city: "Brisbane",
    category: "Adult Meetings"
  },

  {
    id: 5,
    name: "Sample Profile 05",
    city: "Perth",
    category: "Escorts"
  },

  {
    id: 6,
    name: "Sample Profile 06",
    city: "Melbourne",
    category: "Male Escorts"
  },

  {
    id: 7,
    name: "Sample Profile 07",
    city: "Sydney",
    category: "Adult Meetings"
  },

  {
    id: 8,
    name: "Sample Profile 08",
    city: "Adelaide",
    category: "Escorts"
  }

];


/* ===============================
   ELEMENTS
=============================== */

const ageGate =
  document.getElementById("ageGate");

const acceptAge =
  document.getElementById("acceptAge");

const declineAge =
  document.getElementById("declineAge");

const menuButton =
  document.getElementById("menuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

const searchButton =
  document.getElementById("searchButton");

const searchInput =
  document.getElementById("searchInput");

const searchForm =
  document.getElementById("searchForm");

const cityFilter =
  document.getElementById("cityFilter");

const categoryFilter =
  document.getElementById("categoryFilter");

const listingGrid =
  document.getElementById("listingGrid");

const emptyState =
  document.getElementById("emptyState");


/* ===============================
   AGE VERIFICATION
=============================== */

function checkAge(){

  const verified =
    localStorage.getItem(
      "slokka_age_verified"
    );

  if(verified === "true"){

    if(ageGate){
      ageGate.remove();
    }

    document.body.classList.remove(
      "locked"
    );

  }else{

    document.body.classList.add(
      "locked"
    );

  }

}


if(acceptAge){

  acceptAge.addEventListener(
    "click",
    function(){

      localStorage.setItem(
        "slokka_age_verified",
        "true"
      );

      if(ageGate){
        ageGate.remove();
      }

      document.body.classList.remove(
        "locked"
      );

    }
  );

}


if(declineAge){

  declineAge.addEventListener(
    "click",
    function(){

      const card =
        document.querySelector(
          ".age-card"
        );

      if(card){

        card.innerHTML = `
          <div class="age-circle">
            <strong>18+</strong>
          </div>

          <h1>
            Access declined
          </h1>

          <p>
            You must be 18 or older
            to continue.
          </p>
        `;

      }

    }
  );

}


checkAge();


/* ===============================
   MOBILE MENU
=============================== */

if(menuButton){

  menuButton.addEventListener(
    "click",
    function(){

      mobileMenu.classList.toggle(
        "open"
      );

    }
  );

}


/* Close mobile menu */

document
  .querySelectorAll(".mobile-menu a")
  .forEach(function(link){

    link.addEventListener(
      "click",
      function(){

        mobileMenu.classList.remove(
          "open"
        );

      }
    );

  });


/* ===============================
   SEARCH BUTTON
=============================== */

if(searchButton){

  searchButton.addEventListener(
    "click",
    function(){

      const heroSearch =
        document.querySelector(
          ".hero-search"
        );

      if(heroSearch){

        heroSearch.scrollIntoView({
          behavior:"smooth",
          block:"center"
        });

      }

      if(searchInput){

        setTimeout(
          function(){

            searchInput.focus();

          },
          400
        );

      }

    }
  );

}


/* ===============================
   LISTING RENDER
=============================== */

function renderListings(){

  if(!listingGrid){
    return;
  }


  const city =
    cityFilter
      ? cityFilter.value
      : "";

  const category =
    categoryFilter
      ? categoryFilter.value
      : "";

  const search =
    searchInput
      ? searchInput.value
          .trim()
          .toLowerCase()
      : "";


  const filtered =
    listings.filter(function(item){

      const matchesCity =
        !city ||
        item.city === city;

      const matchesCategory =
        !category ||
        item.category === category;

      const searchable =
        (
          item.name +
          " " +
          item.city +
          " " +
          item.category
        ).toLowerCase();

      const matchesSearch =
        !search ||
        searchable.includes(search);


      return (
        matchesCity &&
        matchesCategory &&
        matchesSearch
      );

    });


  listingGrid.innerHTML = "";


  filtered.forEach(
    function(item){

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "listing-card";


      card.innerHTML = `

        <div class="listing-photo">
          SAMPLE
        </div>

        <div class="listing-info">

          <h3>
            ${item.name}
          </h3>

          <div class="listing-meta">
            ${item.category}
            ·
            ${item.city}
          </div>

          <span class="demo-label">
            DEMO / SAMPLE
          </span>

        </div>

      `;


      listingGrid.appendChild(
        card
      );

    }
  );


  if(emptyState){

    emptyState.style.display =
      filtered.length
        ? "none"
        : "block";

  }

}


/* ===============================
   FILTERS
=============================== */

if(cityFilter){

  cityFilter.addEventListener(
    "change",
    renderListings
  );

}


if(categoryFilter){

  categoryFilter.addEventListener(
    "change",
    renderListings
  );

}


/* ===============================
   SEARCH FORM
=============================== */

if(searchForm){

  searchForm.addEventListener(
    "submit",
    function(event){

      event.preventDefault();

      renderListings();

      const listingsSection =
        document.getElementById(
          "listings"
        );

      if(listingsSection){

        listingsSection.scrollIntoView({
          behavior:"smooth"
        });

      }

    }
  );

}


/* ===============================
   CITY BUTTONS
=============================== */

document
  .querySelectorAll(
    "[data-city]"
  )
  .forEach(function(button){

    button.addEventListener(
      "click",
      function(){

        const city =
          this.getAttribute(
            "data-city"
          );


        if(cityFilter){

          cityFilter.value =
            city;

        }


        renderListings();


        const listingsSection =
          document.getElementById(
            "listings"
          );


        if(listingsSection){

          listingsSection.scrollIntoView({
            behavior:"smooth"
          });

        }

      }
    );

  });


/* ===============================
   INITIAL LOAD
=============================== */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    renderListings();

  }
);
