/*
 * This file is part of justoverclock/flarum-ext-guestengagement.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/extend';
import Page from 'flarum/components/Page';
import app from 'flarum/app';
import Swal from 'sweetalert2';

app.initializers.add('justoverclock/flarum-ext-dontgoaway', () => {
  extend(Page.prototype, 'oncreate', function () {
    const TitleModal = app.forum.attribute('ModalTitle');
    const ModalText = app.forum.attribute('ModalText');
    const UrlImage = app.forum.attribute('UrlImage');
    const ImgWidth = app.forum.attribute('WidthImg');
    const ImgHeight = app.forum.attribute('HeightImg');
    const ImgAltAttr = app.forum.attribute('AltAttr');
    const ModalButton = app.forum.attribute('ModalBtn');
    const Dontleave = function () {
      Swal.fire({
        title: TitleModal,
        text: ModalText,
        imageUrl: UrlImage,
        imageWidth: ImgWidth,
        imageHeight: ImgHeight,
        imageAlt: ImgAltAttr,
        confirmButtonText: ModalButton,
        backdrop: ` rgba(0,0,0,0.8)`,
      });
    };
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('mouseout', (event) => {
        // Utilizziamo sessionstorage per memorizzare la visita dell'utente
        var FirstVisit = sessionStorage.getItem('fired');
        // Condizione della prima visita
        if (FirstVisit !== '1')
          if (!event.toElement && !event.relatedTarget)
            if (!app.session.user) {
              setTimeout(() => {
                Dontleave();
              }, 1000);
              // La prima visita segna la chiusura della sessione
              sessionStorage.setItem('fired', '1');
            }
      });
    });
  });
});
