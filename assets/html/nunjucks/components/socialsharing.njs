<div class="social-sharing">
	<a class="share-button-facebook" onClick="return popupShare(this.href);" href="https://www.facebook.com/sharer/sharer.php?u={{ .Permalink }}" target="_blank"><i class="fa fa-facebook"><span>Like</span></i></a>
	<a class="share-button-google-plus" onClick="return popupShare(this.href);" href="https://plus.google.com/share?url={{ .Permalink }}" target="_blank"><i class="fa fa-google-plus"><span>Google +1</span></i></a>
	<a class="share-button-linkedin" onClick="return popupShare(this.href);" href="http://www.linkedin.com/shareArticle?mini=true&url={{ .Permalink }}&title={{ .Title }}&summary={{ .Summary }}}&source={{ .Site.Title }}" target="_blank"><i class="fa fa-linkedin"><span>Share on LinkedIn</span></i></a>
	<a class="share-button-twitter" onClick="return popupShare(this.href);" href="http://twitter.com/share?text={{ .Title }}&url={{ .Permalink }}" target="_blank"><i class="fa fa-twitter"><span>Tweet</span></i></a>	
</div>

<!-- {{ partial "body/socialsharing.njs" . }}      

    <p>some text</p>


    {{ if .Site.Menus.social }}
    <div class="social-buttons">
      {{ range .Site.Menus.social }}
        {{ if .Url }}
        <a href="{{ .Url }}" target="_blank">Icon{{ .Pre }}</a>
        {{ end }}
      {{ end }}
      
    </div>
    {{ end }} --> -->