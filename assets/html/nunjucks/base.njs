{% extends "layouts/holy-grail.njs" %}

{% block sidebar %}

<p>Here is some additional content for the sidebar extended in</p>

{% endblock %}

{% block article %}

  {% raw %}
  {{ Hugo code here to grab the article title and content }}
  {% endraw %}

{% endblock %}
