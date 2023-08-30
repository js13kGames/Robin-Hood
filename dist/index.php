<?php
// header('Content-Type: text/plain');
$css = file_get_contents(getcwd().'/main.min.css');
// $js = file_get_contents('./main.js');
// $js = file_get_contents('../distprep/release.js');
$js = file_get_contents('../distprep/main.js');
$imageData = file_get_contents("./gif.gif");
$base64Data = base64_encode($imageData);
$dataUri = 'data:image/gif;base64,' . $base64Data;
$html = "<!DOCTYPE html><html lang='en'>";
$html .= '<head> 
<title>RobinHoodGame</title>';
$html .= '<style>'.$css.'</style>';
$html .= '</head><body>';
$html .= '<div class="canvas_container"></div>
<div class="assets_container">
    <img id="spriteSheetMain" src="'.$dataUri.'" style="display: none">
</div>';
$html .= '<script>'.$js.'</script>';
$html .= '</body>';
file_put_contents('index.html',$html);
echo $html;
?>