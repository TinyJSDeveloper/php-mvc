<?php
use {{model.namespace}}\\{{model.className}} as {{model.className}};
use {{controller.namespace}}\\{{controller.className}} as {{controller.className}};

$app->get("{{routes.selectAll}}", {{controller.className}}::class.":selectAll");
$app->get("{{routes.base}}/{id}", {{controller.className}}::class.":find");
$app->put("{{routes.base}}{{routes.put}}", {{controller.className}}::class.":put");
$app->patch("{{routes.base}}/{id}{{routes.patch}}", {{controller.className}}::class.":patch");
$app->delete("{{routes.base}}/{id}{{routes.delete}}", {{controller.className}}::class.":delete");
