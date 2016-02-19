<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en-us">
<head>
<title>A Page Title</title>

     <meta name="viewport" content="width=device-width, initial-scale=1">
 <meta charset="utf-8"/>

    <meta property="og:title" content="" />
<meta property="og:description" content="" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="" />
<meta property="og:image" content="" />

    <!-- Complete Style Generated by SASS -->
<link rel="stylesheet" href= "./assets/styles/site.css" }} />

    <!-- Fonts -->


    <!-- Any Javascripts required.  to be loaded in the head -->



</head>


<body class='page'>
    <header>
  <figure class="figure--center">
    <img src="http://placehold.it/1000x200">
  </figure>
</header>




    <div class="rollover-wrapper">

        <nav id="topbar">
      <div id="topbar__sitename"></div>
      <div id="topbar__nav"> Navigation Here</div>
      <div id="topbar__search">Search Bar</div>
      <div id="topbar__language">Language</div>
    </nav>
        <main>

        <aside id="sidebar" class="sidebar">

<p> some sidebar content set in the sidebar.njs file </p>

{% block sidebar %}
  {# This is where one melds in more sidebar content #}
{% endblock %}


</aside>


        <section id="content">

          {% block article %}
            {# This is where one melds in article content #}
          {% endblock %}

        </section>

          </main>
          <footer data-lorem="1p"></footer>


       </div>

      <!-- Post load additional Javascript libraries at end of <body> tag  -->

<!-- js from bower - development -->
<!-- bower:js -->
<!-- endbower -->


<!-- CDNs for production -->
<script src='https://code.jquery.com/jquery-2.1.3.min.js'></script>
<script src='http://cdn.rawgit.com/garand/sticky/master/jquery.sticky.js'></script>
<script src="http://cdn.rawgit.com/f/loremjs/master/lorem.js"></script>


<!-- custom js from your site assests -->
<script src="/assets/js/site.js"></script>


  </body>
