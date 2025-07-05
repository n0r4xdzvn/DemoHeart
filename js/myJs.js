const textConfig = {
  text1: "Hello Cutie! 💕",
  text2: "I have something important to ask you... Please answer honestly! 🥺",
  text3: "Do you love me? 💖",
  text4: "If you close this without answering, that means you want to be mine forever! 😏",
  text5: "Nope 😤",
  text6: "Yes! 💕",
  text7: "Why do you love me so much? 🥰",
  text8: "Send it! 💌",
  text9: "BBecause you're absolutely adorable! ✨",
  text10: "I love you too! 💕",
  text11: "Let's be together forever! 🌸💖",
  text12: "Yay! 🎉",
}

const $ = window.$ // Declare the $ variable
const Swal = window.Swal // Declare the Swal variable

$(document).ready(() => {
  // Add floating hearts
  addFloatingHearts()

  // Process bar
  setTimeout(() => {
    firstQuestion()
    $(".spinner").fadeOut()
    $("#preloader").delay(350).fadeOut("slow")
    $("body").delay(350).css({
      overflow: "visible",
    })
  }, 600)

  $("#text3").html(textConfig.text3)
  $("#text4").html(textConfig.text4)
  $("#no").html(textConfig.text5)
  $("#yes").html(textConfig.text6)

  // Add button container
  $("#yes, #no").wrapAll('<div class="button-container"></div>')

  function addFloatingHearts() {
    const heartsContainer = $('<div class="floating-hearts"></div>')
    for (let i = 0; i < 4; i++) {
      heartsContainer.append('<div class="heart">💖</div>')
    }
    $("body").append(heartsContainer)
  }

  function firstQuestion() {
    $(".content").hide()
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/logo.png",
      imageWidth: 280,
      imageHeight: 280,
      background: "#fff",
      imageAlt: "Cute cat",
      confirmButtonColor: "#ff6b9d",
      confirmButtonText: "Let's go! 💕",
    }).then(() => {
      $(".content").show(200)
    })
  }

  // Switch button position
  function switchButton() {
    var leftNo = $("#no").css("left")
    var topNo = $("#no").css("top")
    var leftYes = $("#yes").css("left")
    var topYes = $("#yes").css("top")
    $("#no").css("left", leftYes)
    $("#no").css("top", topYes)
    $("#yes").css("left", leftNo)
    $("#yes").css("top", topNo)
  }

  // Move button to random position
  function moveButton() {
    const maxWidth = $(window).width() - $("#no").outerWidth()
    const maxHeight = $(window).height() - $("#no").outerHeight()

    const x = Math.random() * Math.max(0, maxWidth - 100)
    const y = Math.random() * Math.max(0, maxHeight - 100)

    $("#no").css({
      position: "fixed",
      left: x + "px",
      top: y + "px",
      zIndex: 1000,
    })
  }

  var attempts = 0
  $("#no").on("mouseenter click", function (e) {
    e.preventDefault()
    attempts++

    if (attempts === 1) {
      $(this).text("Are you sure? 🤔")
    } else if (attempts === 2) {
      $(this).text("Really? 😢")
    } else if (attempts === 3) {
      $(this).text("Please? 🥺")
    } else {
      $(this).text("Fine... 😤")
    }

    if (attempts <= 2) {
      switchButton()
    } else {
      moveButton()
    }
  })

  // Generate text in input
  function textGenerate() {
    var n = ""
    var text = textConfig.text9
    var a = Array.from(text)
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : ""
    var count = textVal.length

    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i]
        if (i == text.length) {
          $("#txtReason").val(text)
          n = ""
          break
        }
      }
    }
    $("#txtReason").val(n)
  }

  // Show popup
  $("#yes").click(function () {
    $(this).addClass("bounce")

    Swal.fire({
      title: textConfig.text7,
      html: `<input type='text' class='form-control' id='txtReason' placeholder='Tell me why... 💕' style='border-radius: 25px; padding: 12px 20px; border: 2px solid #ff6b9d; outline: none;'>`,
      width: 500,
      padding: "2em",
      background: "#fff",
      showCancelButton: false,
      confirmButtonColor: "#ff6b9d",
      confirmButtonText: textConfig.text8,
      customClass: {
        popup: "animated heartBeat",
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 500,
          confirmButtonText: textConfig.text12,
          background: "#fff",
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#ff6b9d",
          customClass: {
            popup: "animated bounceIn",
          },
        }).then(() => {
          // Add sparkle effect
          $("body").append(
            '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem; z-index: 9999; animation: sparkle 2s ease-out;">✨💖✨</div>',
          )
          setTimeout(() => {
            window.location = "./iloveu.html"
          }, 2000)
        })
      }
    })

    // Auto-fill cute text
    $(document).on("focus", "#txtReason", () => {
      var handleWriteText = setInterval(() => {
        textGenerate()
      }, 100)

      $(document).on("blur", "#txtReason", () => {
        clearInterval(handleWriteText)
      })
    })
  })
})

// Add sparkle animation
$("<style>")
  .text(`
  @keyframes sparkle {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  }
`)
  .appendTo("head")
