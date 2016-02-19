{{ partial "head.njs" . }}
{{ partial "body-before.njs" . }}

<!-- Layout for Content Area of Markdown Page Goes Here -->
    <div id="default__title">{{ .Title }}</div>
    <div id="default__subtitle">{{ .Params.subtitle }}</div>
    <div>{{ .Date.Format "Jan 02, 2006" }}</div>


<div id="default_text"> {{ .Content }} </div>
<!-- ************************************************** -->

{{ partial "body-after.njs" . }}
