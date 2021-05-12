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
import PostStream from 'flarum/components/PostStream';
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
extend(PostStream.prototype, 'oncreate', function () {
  if (app.forum.attribute('EnableExtLink') === true)
    jQuery('a')
      .filter(function () {
        return this.hostname && this.hostname !== location.hostname;
      })
      .click(function (e) {
        e.preventDefault();

        // Variabili per le traduzioni
        const ExtLinkTitle = app.translator.trans('flarum-ext-dontgoaway.forum.extlinktitle');
        const ExtLinkText = app.translator.trans('flarum-ext-dontgoaway.forum.extlinktext');
        const ConfButton = app.translator.trans('flarum-ext-dontgoaway.forum.confbutton');
        const CancButton = app.translator.trans('flarum-ext-dontgoaway.forum.cancelbutton');
        // Se la posizione corrente è differente dal nostro dominio
        // vuol dire che si tratta di link esterno
        if (this.hostname !== location.hostname)
          return Swal.fire({
            title: ExtLinkTitle,
            text: ExtLinkText,
            icon: 'question',
            footer: this.href,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ConfButton,
            cancelButtonText: CancButton,
          }).then((result) => {
            // Se confermiamo premendo il pulsante apriamo il link
            // Altrimenti rimaniamo nella stessa posizione
            if (result.isConfirmed) {
              window.location = this.href;
            }
          });
      });
});
