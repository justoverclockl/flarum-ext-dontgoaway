![ezgif-7-9054ec048664](https://user-images.githubusercontent.com/79002016/117632492-78c2e900-b17d-11eb-884d-be9106485e5f.gif)
# Dontgoaway

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/justoverclock/flarum-ext-dontgoaway.svg)](https://packagist.org/packages/justoverclock/flarum-ext-dontgoaway) [![Total Downloads](https://img.shields.io/packagist/dt/justoverclock/flarum-ext-dontgoaway.svg)](https://packagist.org/packages/justoverclock/flarum-ext-dontgoaway)

A [Flarum](http://flarum.org) extension. Show a Popup if an user try to leave your site

Function available:
 - The Exit Int popup will be showed only for guest
 - The modal uses sessionstorage to appear only once per session
 
 Modal Customization through admin setting:
 - Modal Title
 - Modal Text
 - Modal Image
 - Image width
 - Image Height
 - Button fontawesome icon
 - Button Text

### Installation

Install with composer:

```sh
composer require justoverclock/flarum-ext-dontgoaway:"*"
```

### Updating

```sh
composer update justoverclock/flarum-ext-dontgoaway:"*"
php flarum migrate
php flarum cache:clear
```

### Links

- [Packagist](https://packagist.org/packages/justoverclock/flarum-ext-dontgoaway)
- [GitHub](https://github.com/justoverclock/flarum-ext-dontgoaway)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
