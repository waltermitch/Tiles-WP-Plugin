jQuery(document).ready(function ($) {
  $(window).load(function () {
    window.loader.progress(1);
    initThreeJs($("#environments"));
  });

  $(".env-image-container img").load(function () {
    nMask.loaded++;
    window.loader.progress(nMask.loaded / nMask.total);
  });

  // TODO: Handle error
  // $(window).error(function (err) {
  //   console.log(err);
  // });

  // $(".env-image-container img").error(function (err) {
  //   console.log(err);
  // });

  // Load Scripts
  window.selected = $("#tiled-wall-container");

  var renderer;
  var camera;

  // Functions

  function getPart(element) {
    return $(element).data("part");
  }
  function getContainerEnv(element) {
    return $(element).parents(".env-container").data("env");
  }

  window.applyCanvasBackground = function (tileImg, borderPart) {
    if (window.selected == undefined) {
      alert("Please select a surface before proceeding");
      return false;
    }

    var imgSrc = "src";
    var shape = tileImg.attr("data-shape");

    console.log("applyCanvasBackground",shape);

    if (shape == "square"){
      imgSrc = "src";
    }else if (shape == "hexagon" || shape=="ginkgo"){
      imgSrc = "data-hex-src";
    }else if (shape == "lola" || shape=="arabesque"){
      imgSrc = "data-hex-src";
    }else if (shape == "aqua" || shape=="busta"){
      imgSrc = "data-hex-src";
    }else if (shape == "triangle"){
      imgSrc = "data-hex-src";
    }else {
      imgSrc = "src";
    }
    // if (tileImg.attr("data-is-hex") == "1") {
    //   imgSrc = "data-hex-src";
    // }
    // if (tileImg.attr("data-is-ginkgo") == "1") {
    //   imgSrc = "data-hex-src";
    // }

    if (borderPart != undefined) imgSrc = "data-border-" + borderPart + "-src";

    window.selected.each(function () {
      var $background;

      if (borderPart == undefined) {
        $background = $(".background", this);
      } else {
        $background = $(
          '.border-background[data-bg-part="' + borderPart + '"]',
          this
        );
      }

      $background.css("background-size", "");
      var backgroundSizeString = $background.css("background-size");
      var backgroundSize = parseFloat(backgroundSizeString);

      var scale = tileImg.attr("data-tile-scale");
      if (scale == undefined || scale == "") scale = 1;

      if (backgroundSizeString != undefined) {
        // If pixel
        if (backgroundSizeString.indexOf("px") != -1) {
          backgroundSize /= $background.width();
        }

        $background.css({
          backgroundImage: "url(" + tileImg.attr(imgSrc) + ")",
          backgroundSize: backgroundSize * scale + "%",
        });
      }

      if ($(this).hasClass("three-bg-container")) {
        this.hideBorders();

        if (borderPart == undefined) {
          this.changeTile(tileImg.attr(imgSrc), scale);
        } else {
          this.changeBorder(borderPart, tileImg.attr(imgSrc), scale);
        }
      }
    });

    window.selected.removeClass("selected");

    return true;
  };

  window.hideThreeCanvasBorders = function () {
    if (window.selected == undefined) return;

    window.selected.filter(".three-bg-container").each(function () {
      this.hideBorders();
    });
  };

  function getDataArrayFromString(string, prepend) {
    if (prepend == undefined) prepend = "";

    string = prepend + string;

    return string
      .replace(/ /g, "")
      .replace(/,/g, "," + prepend)
      .split(",");
  }

  function render(canvas, scene) {
    // Reset height since height would initialize to 0
    var $canvas = $(canvas);
    canvas.height = (canvas.width * $canvas.outerHeight()) / $canvas.outerWidth();
    
    if(!canvas.height){
      return;
    }

    camera.aspect = canvas.width / canvas.height;

    renderer.setSize(canvas.width, canvas.height);
    renderer.render(scene, camera);

    canvas
      .getContext("2d")
      .drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
  }

  // ThreeJS
  function initThreeJs(envContainer) {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true,
    });

    camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);

    $("canvas.three-bg-container", envContainer).each(function () {
      var canvas = this;
      var $canvas = $(this);
      var $envContainer = $canvas.parents(".env-container");

      var width = $(window).outerWidth() * 0.7;
      var height = (width * $canvas.outerHeight()) / $canvas.outerWidth();

      this.width = width;
      this.height = height;

      console.log('HEIGHT',$canvas, $canvas.outerHeight());

      var scene = new THREE.Scene();

      var geometry = new THREE.PlaneGeometry(
        $canvas.data("width"),
        $canvas.data("height")
      );
      var material = new THREE.MeshBasicMaterial({ color: "beige" });
      var plane = new THREE.Mesh(geometry, material);

      scene.add(plane);

      // Customizations
      // Position
      if ($canvas.data("xposition") != undefined) {
        plane.position.x = $canvas.data("xposition");
      }
      if ($canvas.data("yposition") != undefined) {
        plane.position.y = $canvas.data("yposition");
      }
      if ($canvas.data("zposition") != undefined) {
        plane.position.z = $canvas.data("zposition");
      }

      if ($canvas.data("position") != undefined) {
        var pos = getDataArrayFromString($canvas.data("position"));
        plane.position.set(pos[0], pos[1], pos[2]);
      }

      // Rotation
      if ($canvas.data("xrotation") != undefined) {
        plane.rotation.x = $canvas.data("xrotation");
      }
      if ($canvas.data("yrotation") != undefined) {
        plane.rotation.y = $canvas.data("yrotation");
      }
      if ($canvas.data("zrotation") != undefined) {
        plane.rotation.z = $canvas.data("zrotation");
      }

      if ($canvas.data("rotation") != undefined) {
        var rotation = getDataArrayFromString($canvas.data("rotation"));
        plane.rotation.set(rotation[0], rotation[1], rotation[2]);
      }

      if ($canvas.data("zcamera") != undefined) {
        camera.position.z = $canvas.data("zcamera");
      }

      // Borders
      var borderIds = $canvas.data("borders");
      var borderPlanes = {
        top: [],
        left: [],
        bottom: [],
        right: [],
        "corner-tl": [],
        "corner-tr": [],
        "corner-bl": [],
        "corner-br": [],
      };

      if (borderIds != undefined) {
        borderIds = getDataArrayFromString(borderIds, "#");

        for (var i = 0; i < borderIds.length; i++) {
          var $border = $(borderIds[i]);

          if ($border.length > 0) {
            var data = {
              tileWidth: $canvas.data("width") / $canvas.data("xrepeat") / 2,
              tileHeight: $canvas.data("height") / $canvas.data("yrepeat") / 2,

              xTiles: $border.data("xtiles"),
              yTiles: $border.data("ytiles"),
            };

            if (data.xTiles == undefined) data.xTiles = 1;
            if (data.yTiles == undefined) data.yTiles = 1;

            var width = data.tileWidth * data.xTiles;
            var height = data.tileHeight * data.yTiles;

            var borderGeometry = new THREE.PlaneGeometry(width, height);
            var borderMaterial = new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
            });
            var borderPlane = new THREE.Mesh(borderGeometry, borderMaterial);

            plane.add(borderPlane);

            borderPlane.userData = data;

            // Position
            if ($border.data("position") != undefined) {
              var pos = getDataArrayFromString($border.data("position"));

              borderPlane.position.set(
                parseFloat(pos[0]) * data.tileWidth - data.tileWidth / 2,
                parseFloat(pos[1]) * data.tileHeight - data.tileHeight / 2,
                parseFloat(pos[2])
              );
            }

            borderPlanes[$border.data("border-part")].push(borderPlane);
          }
        }
      }

      $canvas.data("set-rotation", function (x, y, z) {
        plane.rotation.set(x, y, z);
        // renderer.render( scene, camera );
        render(canvas, scene);
      });

      $canvas.data("set-position", function (x, y, z) {
        plane.position.set(x, y, z);
        // renderer.render( scene, camera );
        render(canvas, scene);
      });

      $canvas.data("render", function () {
        // renderer.render( scene, camera );
        
        render(canvas, scene);
      });

      // scene.add( borderPlane )
      // renderer.render( scene, camera );

      this.changeTile = function (tileSrc, tileScale) {
        var img = new Image();
        img.src = tileSrc;

        console.log(tileScale);

        img.onload = function () {
          if (tileScale == undefined || tileScale == "") tileScale = 1;

          var texture = new THREE.Texture();
          texture.image = img;
          texture.needsUpdate = true;

          texture.repeat.set(
            $canvas.data("xrepeat") / tileScale,
            $canvas.data("yrepeat") / tileScale
          );
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

          texture.magFilter = THREE.Linear;
          texture.minFilter = THREE.LinearMipMapLinearFilter;

          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

          material.map = texture;
          material.color = new THREE.Color("white");

          material.needsUpdate = true;

          // renderer.render( scene, camera );
          render(canvas, scene);
          render(canvas, scene);
        };
      };

      this.changeBorder = function (borderPart, tileSrc, tileScale) {
        var img = new Image();
        img.src = tileSrc;

        img.onload = function () {
          for (var i = 0; i < borderPlanes[borderPart].length; i++) {
            if (tileScale == undefined || tileScale == "") tileScale = 1;

            var borderPlane = borderPlanes[borderPart][i];

            var texture = new THREE.Texture();
            texture.image = img;
            texture.needsUpdate = true;

            texture.repeat.set(
              borderPlane.userData.xTiles / tileScale,
              borderPlane.userData.yTiles / tileScale
            );
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            texture.magFilter = THREE.Linear;
            texture.minFilter = THREE.LinearMipMapLinearFilter;

            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            borderPlane.material.map = texture;
            borderPlane.material.color = new THREE.Color("white");

            borderPlane.material.opacity = 1;
            borderPlane.material.needsUpdate = true;
          }

          // renderer.render( scene, camera );
          render(canvas, scene);
        };
      };

      this.hideBorders = function () {
        var borderParts = Object.getOwnPropertyNames(borderPlanes);

        for (var i = 0; i < borderParts.length; i++) {
          for (var j = 0; j < borderPlanes[borderParts[i]].length; j++) {
            var borderPlane = borderPlanes[borderParts[i]][j];

            borderPlane.material.needsUpdate = true;
            borderPlane.material.opacity = 0;
          }
        }

        // renderer.render( scene, camera );
        render(canvas, scene);
      };

      // Render only if active
      if($canvas.parents('.env-container').hasClass('active'))
        render(canvas, scene);

    });
  }

  window.initThreeJs = initThreeJs;

  // Listeners

  $("#environments").on("hover", ".env-container .hover", function (e) {
    var part = getPart(this);
    var env = getContainerEnv(this);

    var container = "#" + env + "-simulator ." + part + "-container";

    if (e.type === "mouseenter") {
      $(container).addClass("hovered");
    } else if (e.type === "mouseleave") {
      $(container).removeClass("hovered");
    }
  });

  $("#environments").on("click", ".env-container .hover", function () {
    if ($(".tile-image-container.selected").length == 0) {
      alert("Please select a tile before proceeding!");
      return;
    }

    var part = getPart(this);
    var env = getContainerEnv(this);

    var container = "#" + env + "-simulator ." + part + "-container";

    $("#" + env + "-simulator .container.selected").removeClass("selected");
    $(container).addClass("selected");

    window.selected = $(container + ", #tiled-wall-container");

    applyColorEditor();

    addActionState();
  });

  $(".env-icons-image-container").click(function () {
    $("#environments .env-container.active").removeClass("active");

    var env = $(this).data("env");

    $("#environments #" + env + "-simulator").addClass("active");

    $(".env-icons-image-container.active").removeClass("active");
    $(this).addClass("active");
  });
});
