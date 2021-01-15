<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Task2.aspx.cs" Inherits="HTML5CSS3Essential.lessons_advanced.lesson01.Task2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="../../img/favicon.png" type="image/png" />
    <title>Advanced-L01: Task 2</title>
    <link href="../../css/general.css" rel="stylesheet" />
    <link href="../../css-advanced/styleindex.css" rel="stylesheet" />
    <link href="../../css/styleHeaderIndex.css" rel="stylesheet" />
    <link href="../../css/styleShortDescriptionPanel.css" rel="stylesheet" />
    <link href="../../css/generalStyleTask.css" rel="stylesheet" />
    <link href="../../css/styleLesson.css" rel="stylesheet" />
    <link href="../../css-advanced/styleLessonRenew.css" rel="stylesheet" />
    <link href="../../css/styleFooterIndex.css" rel="stylesheet" />
    <link href="../../css/styleLogo.css" rel="stylesheet" />
    <link href="../../css-advanced/styleClipPath.css" rel="stylesheet" />
    <link href="../../MySlider/css/mySlider.css" rel="stylesheet" />
    <link href="css/travelAgency.css" rel="stylesheet" />
</head>
<body>
    <div class="short-description-panel radius7" id="shortDescriptionPanel">
        <div class="short-description-panel-header">
            <p class="margin0">HTML5&CSS3 Advanced: Lesson 01: Микроданные и пользовательские данные. Drag&Drop. Геолокация. Task 2.</p>
            <div class="short-description-panel-header-close">
                <p class="short-description-panel-header-caption">short description</p>
                <img id="shortDescriptionPanelClose" class="block-left" src="../../img/window-close.png" alt="" title="Esc" />
            </div>
        </div>
        <div class="short-description-panel-content">
            <p class="abzac">Всем доброго времени суток.</p>
            <br />
            <p class="abzac">02.09.2020</p>
            <p class="abzac">
                Опубликовал решение для 2-й задачи 1-й лекции курса HTML5&CSS3 Avanced. Здесь уже использовал aspx-страницу с целью
                хранения краткого описания отеля на сервере. Также доработал слайдер, что позволило легко размещать несколько слайдеров 
                на одной странице. Для данной задачи так же сделал краткое описательное видео и добавил его на соответствущую страницу
                the most interesting.
            </p>
        </div>
    </div>

    <div class="show-full-screen" id="show-full-screen">
        <div class="image" id="full-screen-image">
            <div class="full-screen-collaps">
                <img src="../../img/arrow-collapse-white.png" id="full-screen-close" />
            </div>
            <div class="show-fs-left-right">
                <div class="show-fs-left" id="images-fs-left" data-enable="true">&nbsp;</div>
                <div class="show-fs-right" id="images-fs-right" data-enable="true">&nbsp;</div>
            </div>
        </div>
        <div class="list" id="full-screen-list">
            <!--Inner Html will be created from code-->
        </div>
    </div>

    <div class="map-hotel" id="map-hotel">
        <header class="header-map">
            <div class="header-map-about">
                <span class="name-hotel" id="map-name-hotel"></span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span class="stars-hotel">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <div class="header-map-close">
                <img id="map-close-control" src="../../img/window-close.png" alt=""/>
            </div>
        </header>
        <section class="set-map">
            <iframe class="map" id="map" ></iframe>
        </section>
    </div>

    <aside class="body-aside"></aside>

    <main class="body-main">
        <header class="header-index">
            <section class="header-general">
                <a href="../../index-ts.html">
                    <h4 class="h-subject">HTML5&CSS3 ADVANCED</h4>
                </a>
                <table>
                    <tr>
                        <td>
                            <a href="../../AboutHTML.html">
                                <img src="../../img/html-5-icon-64x64.png" alt="HTML5" />
                            </a></td>
                        <td>
                            <img src="../../img/css-3-icon-64x64.png" alt="CSS3" />
                        </td>
                        <td>
                            <img src="../../img/javascript-icon-64x64.png" alt="JS" />
                        </td>
                    </tr>
                </table>
            </section>
            <section class="header-task-content  background-transparent-50">
                <h2 class="padding-8-16">Lesson 01:  Микроданные и пользовательские данные. Drag&Drop. Геолокация.</h2>
                <h3 class="padding-8-16">Task 2.</h3>
                <div class="summary-task task-page">
                    <div class="block-setter padding-8-0">
                        Создайте страницу ТурФирмы. Основные элементы – <span class="accent">header</span>, <span class="accent">footer</span>,
                        <span class="accent">section</span>, <span class="accent">nav</span>. В элементе
                        <span class="accent">section</span> – минимум 4 блока с ТОПовыми отелями. В блоке есть фото и
                        информация про отель. Снизу под описанием – кнопка – «Посмотреть на карте». При нажатии на кнопку –
                        появляется карта с расположением данного отеля.
                    </div>
                </div>
            </section>
        </header>

        <section class="block-setter f-family-Roboto">
            <section class="section-subtask box-shadow-orange radius7">
                <div class="subtask-box radius7 overflow-auto">
                    <section class="general-info-container">

                        <article class="general-info-card" data-hotel="maxxRoyalKemerResort">
                            <div>
                                <p class="header-hotel">
                                    <span class="name-hotel">Maxx Royal Kemer Resort</span>
                                    <span class="stars-hotel">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                </p>
                            </div>
                            <a class="on-the-map" data-name-hotel="Maxx Royal Kemer Resort" id="01-anchor-to-map"
                                data-map-src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12198.55125458211!2d30.584935!3d36.578289!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4f32bf4d7fb5d859!2sMaxx%20Royal%20Kemer%20Resort!5e1!3m2!1sru!2sua!4v1598011486835!5m2!1sru!2sua">
                                <img src="../../img/map-marker-24.png" />
                            </a>
                            <div class="images" id="01-imagesOff">
                                <div class="show-collaps-off">
                                    <img src="../../img/arrow-collapse-white.png" id="01-show-collaps-off" />
                                </div>
                                <div class="show-left-right">
                                    <div class="show-left" id="01-images-show-left" data-enable="true">&nbsp;</div>
                                    <div class="show-right" id="01-images-show-right" data-enable="true">&nbsp;</div>
                                </div>
                            </div>
                            <div>
                                <asp:Label ID="maxxRoyalKemerResort" runat="server" CssClass="short-descrption"></asp:Label>
                                <asp:Label ID="errorLoadDescription01" runat="server" Style="display: none"></asp:Label>
                            </div>
                        </article>

                        <article class="general-info-card" data-hotel="maxxRoyalBelekGolfResort">
                            <div>
                                <p class="header-hotel">
                                    <span class="name-hotel">Maxx Royal Belek Golf Resort</span>
                                    <span class="stars-hotel">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                </p>
                            </div>
                            <a class="on-the-map" data-name-hotel="Maxx Royal Belek Golf Resort" id="02-anchor-to-map"
                                data-map-src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1519.4667656211577!2d31.0704!3d36.84844!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1598984267039!5m2!1sru!2sus">
                                <img src="../../img/map-marker-24.png" />
                            </a>
                            <div class="images" id="02-imagesOff">
                                <div class="show-collaps-off">
                                    <img src="../../img/arrow-collapse-white.png" id="02-show-collaps-off" />
                                </div>
                                <div class="show-left-right">
                                    <div class="show-left" id="02-images-show-left" data-enable="true">&nbsp;</div>
                                    <div class="show-right" id="02-images-show-right" data-enable="true">&nbsp;</div>
                                </div>
                            </div>
                            <div>
                                <asp:Label ID="maxxRoyalBelekGolfResort" runat="server" CssClass="short-descrption"></asp:Label>
                                <asp:Label ID="errorLoadDescription02" runat="server" Style="display: none"></asp:Label>
                            </div>
                        </article>

                        <article class="general-info-card" data-hotel="gloriaSerenityResort">
                            <div>
                                <p class="header-hotel">
                                    <span class="name-hotel">Gloria Serenity Resort</span>
                                    <span class="stars-hotel">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                </p>
                            </div>
                            <a class="on-the-map" data-name-hotel="Gloria Serenity Resort" id="03-anchor-to-map"
                                data-map-src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1519.6269371167432!2d31.10758!3d36.84038!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1598984888980!5m2!1sru!2sus">
                                <img src="../../img/map-marker-24.png" />
                            </a>
                            <div class="images" id="03-imagesOff">
                                <div class="show-collaps-off">
                                    <img src="../../img/arrow-collapse-white.png" id="03-show-collaps-off" />
                                </div>
                                <div class="show-left-right">
                                    <div class="show-left" id="03-images-show-left" data-enable="true">&nbsp;</div>
                                    <div class="show-right" id="03-images-show-right" data-enable="true">&nbsp;</div>
                                </div>
                            </div>
                            <div>
                                <asp:Label ID="gloriaSerenityResort" runat="server" CssClass="short-descrption"></asp:Label>
                                <asp:Label ID="errorLoadDescription03" runat="server" Style="display: none"></asp:Label>
                            </div>
                        </article>

                        <article class="general-info-card" data-hotel="hiltonDalamanSarigermeResortSpa">
                            <div>
                                <p class="header-hotel">
                                    <span class="name-hotel">Hilton Dalaman Sarigerme Resort & Spa</span>
                                    <span class="stars-hotel">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                </p>
                            </div>
                            <a class="on-the-map" data-name-hotel="Hilton Dalaman Sarigerme Resort & Spa" id="04-anchor-to-map"
                                data-map-src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1522.256706824952!2d28.72386!3d36.70783!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1598985117451!5m2!1sru!2sus">
                                <img src="../../img/map-marker-24.png" />
                            </a>
                            <div class="images" id="04-imagesOff">
                                <div class="show-collaps-off">
                                    <img src="../../img/arrow-collapse-white.png" id="04-show-collaps-off" />
                                </div>
                                <div class="show-left-right">
                                    <div class="show-left" id="04-images-show-left" data-enable="true">&nbsp;</div>
                                    <div class="show-right" id="04-images-show-right" data-enable="true">&nbsp;</div>
                                </div>
                            </div>
                            <div>
                                <asp:Label ID="hiltonDalamanSarigermeResortSpa" runat="server" CssClass="short-descrption"></asp:Label>
                                <asp:Label ID="errorLoadDescription04" runat="server" Style="display: none"></asp:Label>
                            </div>
                        </article>

                    </section>

                    <%--<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12198.55125458211!2d30.584935!3d36.578289!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4f32bf4d7fb5d859!2sMaxx%20Royal%20Kemer%20Resort!5e1!3m2!1sru!2sua!4v1598011486835!5m2!1sru!2sua" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>--%>
                </div>
            </section>
        </section>

        <section class="block-setter p-b-16">
            <hr />
            <div class="recommended-links">
                <h3 class="h-panel">Рекомендуемые ресурсы</h3>
                <p><a href="http://htmlbook.ru/">HTML Book</a> </p>
                <p><a href="https://html.com/">HTML</a> </p>
                <p><a href="https://developers.google.com/web">Google Web Developers</a> </p>
                <p><a href="https://developers.google.com/maps/documentation/geolocation/intro?hl=ru">Geolocation documentation</a> </p>
                <p><a href="https://schema.org/">Словари микроданных</a> </p>
            </div>
        </section>

        <footer class="footer-index overflow-auto">
            <div>
                <div class="logo-box m-auto" id="logoBox">
                    <img id="logoImg" class="logo-img" src="../../img/smile.png" alt="" />
                    <p id="logoName" class="logo-name">&copy; PgkSoft</p>
                </div>
                <div class="p-t-16">
                    <a class="outline-none" title="Telegram" href="tg://resolve?domain=PgkSoft">
                        <img class="logo-socials" src="../../img/telegram-32.png" alt="" />
                    </a>
                    <a class="outline-none" title="Mobile Viber" href="viber://add?number=380636068484">
                        <img class="logo-socials" src="../../img/web-viber-icon.png" alt="" />
                    </a>
                    <a class="outline-none" title="Messenger" href="https://m.me/pgksoft">
                        <img class="logo-socials" src="../../img/facebook-messenger-32.png" alt="" />
                    </a>
                    <a class="outline-none" title="EMail" href="mailto:pgksoft@ukr.net?subject=HTML5CSS3Essential">
                        <img class="logo-socials" src="../../img/email-icon.png" alt="" />
                    </a>
                    <a class="outline-none" title="Cellphone" href="tel:+380636068484">
                        <img class="logo-socials" src="../../img/phone-icon.png" alt="" />
                    </a>
                </div>
            </div>
            <div>
                <p></p>
            </div>
        </footer>

    </main>

    <aside class="body-aside"></aside>

    <script src="../../js/shortDescription.dist.js"></script>
    <script src="../../js-advanced/clipPath.dist.js"></script>
    <script src="ts/travelAgency.dist.js"></script>
</body>
</html>


