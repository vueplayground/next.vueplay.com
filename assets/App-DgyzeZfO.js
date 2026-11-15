var e=`<template>
  <div class="vp-product-details" :class="'vp-product-details--' + layout" :style="style">
    <div class="vp-product-details__pictures">
      <div class="vp-product-details__main">
        <img v-if="pictures[shownPicture]" :src="address(pictures[shownPicture]) || undefined" :style="held(pictures[shownPicture])" :alt="product.title" loading="eager" fetchpriority="high" decoding="async">
        <span v-else class="vp-product-details__none">{{ (product.title || '?').charAt(0) }}</span>
        <span v-if="onSale" class="vp-product-details__sale">{{ say('sale', saleText) }}</span>
      </div>
      <div v-if="pictures.length > 1" class="vp-product-details__thumbs">
        <button v-for="(src, i) in pictures" :key="src + i" type="button" class="vp-product-details__thumb" :class="{ 'vp-product-details__thumb--on': i === shownPicture }" :aria-label="say('picture', '', i + 1)" @click="shownPicture = i">
          <img :src="address(src) || undefined" :style="held(src)" alt="" loading="lazy" decoding="async">
        </button>
      </div>
    </div>

    <div class="vp-product-details__words">
      <p v-if="product.brand || kicker" class="vp-product-details__kicker">{{ kicker || product.brand }}</p>
      <h1 class="vp-product-details__title">{{ product.title }}</h1>
      <!-- the stars and how many have rated it: a click goes to the reviews -->
      <button v-if="stars" type="button" class="vp-product-details__rating" :aria-label="ratingLabel" @click="toReviews">
        <span class="vp-product-details__stars" :style="{ '--vp-product-details-stars': part(stars) }" aria-hidden="true"></span>
        <span class="vp-product-details__score" aria-hidden="true">{{ number(stars) }}</span>
        <span v-if="ratedBy" class="vp-product-details__count" aria-hidden="true">({{ ratedBy }})</span>
      </button>
      <p class="vp-product-details__price">
        <span>{{ priceText(chosenPrice) }}</span>
        <s v-if="onSale">{{ priceText(product.compare) }}</s>
      </p>

      <!-- the kinds there are (sizes, colours): each a button; one that is sold out cannot be chosen -->
      <div v-if="kinds.length > 1" class="vp-product-details__kinds" role="group" :aria-label="say('choose', variantLabel)">
        <span class="vp-product-details__label">{{ say('choose', variantLabel) }}</span>
        <div class="vp-product-details__choices">
          <button
            v-for="(one, i) in kinds"
            :key="one.id || i"
            type="button"
            class="vp-product-details__choice"
            :class="{ 'vp-product-details__choice--on': i === chosen, 'vp-product-details__choice--out': !one.available }"
            :disabled="!one.available"
            :aria-pressed="i === chosen ? 'true' : 'false'"
            @click="chosen = i"
          >{{ one.title }}</button>
        </div>
      </div>

      <div class="vp-product-details__buy">
        <div class="vp-product-details__quantity" role="group" :aria-label="say('howMany', quantityLabel)">
          <button type="button" :aria-label="say('less')" :disabled="quantity <= 1" @click="quantity--">−</button>
          <input v-model.number="quantity" type="number" min="1" max="99" :aria-label="say('howMany', quantityLabel)">
          <button type="button" :aria-label="say('more')" @click="quantity = Math.min(99, quantity + 1)">+</button>
        </div>
        <button type="button" class="vp-product-details__add" :disabled="!canBuy" @click="add">
          <svg v-if="added" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          {{ !variant.available ? say('soldOut', soldOutText) : added ? say('added', addedText) : say('add', addText) }}
        </button>
      </div>
      <button v-if="buyNow" type="button" class="vp-product-details__now" :disabled="!canBuy" @click="now">{{ say('buyNow', buyNowText) }}</button>

      <div v-if="product.description" class="vp-product-details__about">
        <p v-if="!drawn" class="vp-product-details__plain">{{ plainDescription }}</p>
        <div ref="about" class="vp-product-details__drawn" />
      </div>
      <p v-else-if="product.text" class="vp-product-details__about">{{ product.text }}</p>
      <slot />
    </div>

    <!-- what buyers said, and a form to say it too -->
    <section v-if="showReviews" ref="reviews" class="vp-product-details__reviews" :aria-label="say('reviews', reviewsTitle)">
      <header class="vp-product-details__reviews-head">
        <h2>{{ say('reviews', reviewsTitle) }}</h2>
        <p v-if="stars" class="vp-product-details__average">
          <span class="vp-product-details__stars" :style="{ '--vp-product-details-stars': part(stars) }" aria-hidden="true"></span>
          <b>{{ say('outOf', '', number(stars)) }}</b>
          <span v-if="ratedBy">· {{ say(ratedBy === 1 ? 'review1' : 'reviewN', '', ratedBy) }}</span>
        </p>
      </header>
      <p v-if="!reviewList.length" class="vp-product-details__no-reviews">{{ say('none') }}</p>
      <ul v-else class="vp-product-details__review-list">
        <li v-for="(one, i) in reviewList" :key="i" class="vp-product-details__review">
          <p v-if="one.rating" class="vp-product-details__review-stars" :aria-label="say('rated', '', number(one.rating))">
            <span class="vp-product-details__stars" :style="{ '--vp-product-details-stars': part(one.rating) }" aria-hidden="true"></span>
          </p>
          <p class="vp-product-details__review-by">
            <b v-if="one.author">{{ one.author }}</b>
            <time v-if="one.date" :datetime="one.date">{{ day(one.date) }}</time>
          </p>
          <p v-if="one.text" class="vp-product-details__review-text">{{ one.text }}</p>
        </li>
      </ul>

      <form v-if="canReview" class="vp-product-details__write" novalidate @submit.prevent="sendReview">
        <h3>{{ say('write') }}</h3>
        <p v-if="state === 'sent'" class="vp-product-details__thanks" role="status">{{ say('thanks') }}</p>
        <template v-else>
          <fieldset class="vp-product-details__picker">
            <legend>{{ say('yourRating') }}</legend>
            <label v-for="n in 5" :key="n" class="vp-product-details__pick" :class="{ 'vp-product-details__pick--on': n <= (hovered || mine.rating) }" @mouseenter="hovered = n" @mouseleave="hovered = 0">
              <input v-model.number="mine.rating" type="radio" :name="'vp-product-details-rating-' + uid" :value="n" :aria-label="say('starsOf', '', n)">
              <span aria-hidden="true">★</span>
            </label>
          </fieldset>
          <label class="vp-product-details__field">
            <span>{{ say('name') }}</span>
            <input v-model="mine.name" type="text" name="name" autocomplete="name" maxlength="80">
          </label>
          <label class="vp-product-details__field">
            <span>{{ say('text') }}</span>
            <textarea v-model="mine.text" name="text" rows="4" maxlength="4000" />
          </label>
          <p v-if="state === 'failed'" class="vp-product-details__problem" role="alert">{{ failure || say('failed') }}</p>
          <button type="submit" class="vp-product-details__send" :disabled="state === 'sending'">{{ state === 'sending' ? say('sending') : say('send') }}</button>
        </template>
        <p v-if="inStudio" class="vp-product-details__studio">In the editor nothing is sent. On the site this goes to {{ reviewSource ? reviewSource + ' ' + (reviewPath || '/reviews') : 'the source chosen in Props' }}.</p>
      </form>
    </section>
  </div>
</template>
<script>
// One product: its pictures (a large one and the others to pick), its name, price and the price before, the kinds
// there are (sizes, colours: Shopify's variants or your own list), how many, and Add to cart (or Buy now, straight
// to checkout). Made for the page of each product: show each setting from the product's query with the plug.
// What is put inside it comes under the description. Under it: its stars and reviews, and a form to write one
// (sent to a route of your backend). Search engines are told about it (name, price, stock, rating). In the editor,
// nothing set shows a sample.
const SAMPLE = {
  id: 's1', title: 'Linen shirt', price: 590, compare: 790, currency: 'EUR', rating: 4.6, reviewCount: 38,
  text: 'Woven in Portugal from European flax. Light, cool and softer with every wash.'
}
const SAMPLE_REVIEWS = [
  { author: 'Ingrid H.', rating: 5, date: '2026-10-02', text: 'Lovely fabric and a perfect fit. I bought a second one in blue.' },
  { author: 'Marco R.', rating: 4, date: '2026-09-18', text: 'Cool on warm days. Runs a little large, so take a size down.' },
  { author: 'Sofie L.', rating: 5, date: '2026-08-27', text: 'Gets softer every wash, just as promised.' }
]

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { choose: 'Choose', howMany: 'How many', less: 'One less', more: 'One more', add: 'Add to cart', added: 'Added to the cart', soldOut: 'Sold out', buyNow: 'Buy now', sale: 'Sale', picture: 'Picture {n}', rated: 'Rated {n} out of 5', reviews: 'Reviews', review1: '{n} review', reviewN: '{n} reviews', none: 'No reviews yet.', outOf: '{n} out of 5', write: 'Write a review', yourRating: 'Your rating', starsOf: '{n} out of 5 stars', name: 'Your name', text: 'Your review', send: 'Send review', sending: 'Sending…', thanks: 'Thank you! Your review has been sent.', failed: 'Your review could not be sent. Please try again.', pick: 'Please choose a rating.' },
  nb: { choose: 'Velg', howMany: 'Antall', less: 'Én mindre', more: 'Én til', add: 'Legg i handlekurven', added: 'Lagt i handlekurven', soldOut: 'Utsolgt', buyNow: 'Kjøp nå', sale: 'Salg', picture: 'Bilde {n}', rated: 'Vurdert til {n} av 5', reviews: 'Anmeldelser', review1: '{n} anmeldelse', reviewN: '{n} anmeldelser', none: 'Ingen anmeldelser ennå.', outOf: '{n} av 5', write: 'Skriv en anmeldelse', yourRating: 'Din vurdering', starsOf: '{n} av 5 stjerner', name: 'Ditt navn', text: 'Din anmeldelse', send: 'Send anmeldelse', sending: 'Sender…', thanks: 'Takk! Anmeldelsen din er sendt.', failed: 'Anmeldelsen kunne ikke sendes. Prøv igjen.', pick: 'Velg en vurdering.' },
  sv: { choose: 'Välj', howMany: 'Antal', less: 'En färre', more: 'En till', add: 'Lägg i varukorgen', added: 'Tillagd i varukorgen', soldOut: 'Slutsåld', buyNow: 'Köp nu', sale: 'Rea', picture: 'Bild {n}', rated: 'Betyg {n} av 5', reviews: 'Recensioner', review1: '{n} recension', reviewN: '{n} recensioner', none: 'Inga recensioner än.', outOf: '{n} av 5', write: 'Skriv en recension', yourRating: 'Ditt betyg', starsOf: '{n} av 5 stjärnor', name: 'Ditt namn', text: 'Din recension', send: 'Skicka recension', sending: 'Skickar…', thanks: 'Tack! Din recension har skickats.', failed: 'Recensionen kunde inte skickas. Försök igen.', pick: 'Välj ett betyg.' },
  da: { choose: 'Vælg', howMany: 'Antal', less: 'Én mindre', more: 'Én mere', add: 'Læg i kurven', added: 'Lagt i kurven', soldOut: 'Udsolgt', buyNow: 'Køb nu', sale: 'Udsalg', picture: 'Billede {n}', rated: 'Bedømt {n} ud af 5', reviews: 'Anmeldelser', review1: '{n} anmeldelse', reviewN: '{n} anmeldelser', none: 'Ingen anmeldelser endnu.', outOf: '{n} ud af 5', write: 'Skriv en anmeldelse', yourRating: 'Din bedømmelse', starsOf: '{n} ud af 5 stjerner', name: 'Dit navn', text: 'Din anmeldelse', send: 'Send anmeldelse', sending: 'Sender…', thanks: 'Tak! Din anmeldelse er sendt.', failed: 'Anmeldelsen kunne ikke sendes. Prøv igen.', pick: 'Vælg en bedømmelse.' },
  fi: { choose: 'Valitse', howMany: 'Määrä', less: 'Yksi vähemmän', more: 'Yksi lisää', add: 'Lisää ostoskoriin', added: 'Lisätty ostoskoriin', soldOut: 'Loppuunmyyty', buyNow: 'Osta nyt', sale: 'Ale', picture: 'Kuva {n}', rated: 'Arvio {n}/5', reviews: 'Arvostelut', review1: '{n} arvostelu', reviewN: '{n} arvostelua', none: 'Ei vielä arvosteluja.', outOf: '{n}/5', write: 'Kirjoita arvostelu', yourRating: 'Arviosi', starsOf: '{n}/5 tähteä', name: 'Nimesi', text: 'Arvostelusi', send: 'Lähetä arvostelu', sending: 'Lähetetään…', thanks: 'Kiitos! Arvostelusi on lähetetty.', failed: 'Arvostelua ei voitu lähettää. Yritä uudelleen.', pick: 'Valitse arvio.' },
  de: { choose: 'Auswählen', howMany: 'Menge', less: 'Eins weniger', more: 'Eins mehr', add: 'In den Warenkorb', added: 'Zum Warenkorb hinzugefügt', soldOut: 'Ausverkauft', buyNow: 'Jetzt kaufen', sale: 'Sale', picture: 'Bild {n}', rated: 'Bewertet mit {n} von 5', reviews: 'Bewertungen', review1: '{n} Bewertung', reviewN: '{n} Bewertungen', none: 'Noch keine Bewertungen.', outOf: '{n} von 5', write: 'Bewertung schreiben', yourRating: 'Deine Bewertung', starsOf: '{n} von 5 Sternen', name: 'Dein Name', text: 'Dein Kommentar', send: 'Bewertung senden', sending: 'Wird gesendet…', thanks: 'Danke! Deine Bewertung wurde gesendet.', failed: 'Die Bewertung konnte nicht gesendet werden. Bitte versuche es erneut.', pick: 'Bitte wähle eine Bewertung.' },
  fr: { choose: 'Choisir', howMany: 'Quantité', less: 'Un de moins', more: 'Un de plus', add: 'Ajouter au panier', added: 'Ajouté au panier', soldOut: 'Épuisé', buyNow: 'Acheter maintenant', sale: 'Promo', picture: 'Image {n}', rated: 'Noté {n} sur 5', reviews: 'Avis', review1: '{n} avis', reviewN: '{n} avis', none: 'Aucun avis pour le moment.', outOf: '{n} sur 5', write: 'Écrire un avis', yourRating: 'Votre note', starsOf: '{n} étoiles sur 5', name: 'Votre nom', text: 'Votre avis', send: 'Envoyer l’avis', sending: 'Envoi…', thanks: 'Merci ! Votre avis a été envoyé.', failed: 'Votre avis n’a pas pu être envoyé. Veuillez réessayer.', pick: 'Veuillez choisir une note.' },
  es: { choose: 'Elegir', howMany: 'Cantidad', less: 'Uno menos', more: 'Uno más', add: 'Añadir al carrito', added: 'Añadido al carrito', soldOut: 'Agotado', buyNow: 'Comprar ahora', sale: 'Oferta', picture: 'Imagen {n}', rated: 'Valorado con {n} de 5', reviews: 'Reseñas', review1: '{n} reseña', reviewN: '{n} reseñas', none: 'Aún no hay reseñas.', outOf: '{n} de 5', write: 'Escribir una reseña', yourRating: 'Tu valoración', starsOf: '{n} de 5 estrellas', name: 'Tu nombre', text: 'Tu reseña', send: 'Enviar reseña', sending: 'Enviando…', thanks: '¡Gracias! Tu reseña se ha enviado.', failed: 'No se pudo enviar la reseña. Inténtalo de nuevo.', pick: 'Elige una valoración.' },
  it: { choose: 'Scegli', howMany: 'Quantità', less: 'Uno in meno', more: 'Uno in più', add: 'Aggiungi al carrello', added: 'Aggiunto al carrello', soldOut: 'Esaurito', buyNow: 'Acquista ora', sale: 'Saldi', picture: 'Immagine {n}', rated: 'Valutato {n} su 5', reviews: 'Recensioni', review1: '{n} recensione', reviewN: '{n} recensioni', none: 'Ancora nessuna recensione.', outOf: '{n} su 5', write: 'Scrivi una recensione', yourRating: 'La tua valutazione', starsOf: '{n} stelle su 5', name: 'Il tuo nome', text: 'La tua recensione', send: 'Invia recensione', sending: 'Invio in corso…', thanks: 'Grazie! La tua recensione è stata inviata.', failed: 'Impossibile inviare la recensione. Riprova.', pick: 'Scegli una valutazione.' },
  nl: { choose: 'Kies', howMany: 'Aantal', less: 'Eén minder', more: 'Eén meer', add: 'In winkelwagen', added: 'Toegevoegd aan winkelwagen', soldOut: 'Uitverkocht', buyNow: 'Nu kopen', sale: 'Sale', picture: 'Afbeelding {n}', rated: 'Beoordeeld met {n} van 5', reviews: 'Reviews', review1: '{n} review', reviewN: '{n} reviews', none: 'Nog geen reviews.', outOf: '{n} van 5', write: 'Schrijf een review', yourRating: 'Jouw beoordeling', starsOf: '{n} van 5 sterren', name: 'Je naam', text: 'Jouw review', send: 'Review versturen', sending: 'Versturen…', thanks: 'Bedankt! Je review is verstuurd.', failed: 'Je review kon niet worden verstuurd. Probeer het opnieuw.', pick: 'Kies een beoordeling.' },
  pt: { choose: 'Escolher', howMany: 'Quantidade', less: 'Menos um', more: 'Mais um', add: 'Adicionar ao carrinho', added: 'Adicionado ao carrinho', soldOut: 'Esgotado', buyNow: 'Comprar agora', sale: 'Promoção', picture: 'Imagem {n}', rated: 'Avaliado com {n} de 5', reviews: 'Avaliações', review1: '{n} avaliação', reviewN: '{n} avaliações', none: 'Ainda não há avaliações.', outOf: '{n} de 5', write: 'Escrever uma avaliação', yourRating: 'Sua nota', starsOf: '{n} de 5 estrelas', name: 'Seu nome', text: 'Sua avaliação', send: 'Enviar avaliação', sending: 'Enviando…', thanks: 'Obrigado! Sua avaliação foi enviada.', failed: 'Não foi possível enviar a avaliação. Tente novamente.', pick: 'Escolha uma nota.' },
  pl: { choose: 'Wybierz', howMany: 'Ilość', less: 'Jeden mniej', more: 'Jeden więcej', add: 'Dodaj do koszyka', added: 'Dodano do koszyka', soldOut: 'Wyprzedane', buyNow: 'Kup teraz', sale: 'Wyprzedaż', picture: 'Zdjęcie {n}', rated: 'Ocena {n} na 5', reviews: 'Opinie', review1: '{n} opinia', reviewN: 'Liczba opinii: {n}', none: 'Brak opinii.', outOf: '{n} na 5', write: 'Napisz opinię', yourRating: 'Twoja ocena', starsOf: '{n} na 5 gwiazdek', name: 'Twoje imię', text: 'Twoja opinia', send: 'Wyślij opinię', sending: 'Wysyłanie…', thanks: 'Dziękujemy! Twoja opinia została wysłana.', failed: 'Nie udało się wysłać opinii. Spróbuj ponownie.', pick: 'Wybierz ocenę.' },
  zh: { choose: '选择', howMany: '数量', less: '减少一件', more: '增加一件', add: '加入购物车', added: '已加入购物车', soldOut: '已售罄', buyNow: '立即购买', sale: '特价', picture: '图片 {n}', rated: '评分 {n}/5', reviews: '评价', review1: '{n} 条评价', reviewN: '{n} 条评价', none: '暂无评价。', outOf: '{n}/5', write: '写评价', yourRating: '你的评分', starsOf: '{n}/5 星', name: '你的名字', text: '你的评价', send: '提交评价', sending: '正在提交…', thanks: '谢谢！你的评价已提交。', failed: '评价提交失败，请重试。', pick: '请选择评分。' },
  ja: { choose: '選択', howMany: '数量', less: '1つ減らす', more: '1つ増やす', add: 'カートに入れる', added: 'カートに追加しました', soldOut: '売り切れ', buyNow: '今すぐ購入', sale: 'セール', picture: '画像 {n}', rated: '5段階中{n}の評価', reviews: 'レビュー', review1: 'レビュー{n}件', reviewN: 'レビュー{n}件', none: 'まだレビューはありません。', outOf: '5点中{n}点', write: 'レビューを書く', yourRating: 'あなたの評価', starsOf: '5つ星中{n}', name: 'お名前', text: 'レビュー内容', send: 'レビューを送信', sending: '送信中…', thanks: 'ありがとうございます！レビューを送信しました。', failed: 'レビューを送信できませんでした。もう一度お試しください。', pick: '評価を選んでください。' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    title: { type: String, default: '', label: 'Name' },
    price: { type: Number, default: null, label: 'Price', control: 'number' },
    compare: { type: Number, default: null, label: 'Price before (on sale)', control: 'number' },
    currency: { type: String, default: '', label: 'Currency', placeholder: 'EUR' },
    id: { type: String, default: '', label: 'What goes in the cart (its id)' },
    sku: { type: String, default: '', label: 'Its article number (SKU)' },
    brand: { type: String, default: '', label: 'Brand' },
    image: { type: String, default: '', label: 'Picture', control: 'media' },
    images: { type: Array, default: () => [], label: 'More pictures', control: 'list', fields: [{ key: 'src', label: 'Picture', control: 'media' }] },
    description: { type: String, default: '', label: 'Description (as the shop wrote it, HTML)', control: 'textarea' },
    text: { type: String, default: '', label: 'Description (words)', control: 'textarea' },
    variants: {
      type: Array,
      default: () => [],
      label: 'Kinds (sizes, colours)',
      control: 'list',
      fields: [{ key: 'title', label: 'Name', placeholder: 'M / Blue' }, { key: 'id', label: 'Its id (for the cart)' }, { key: 'price', label: 'Its price (when another)', control: 'number' }, { key: 'available', label: 'In stock', control: 'boolean', default: true }]
    },
    rating: { type: Number, default: null, label: 'Rating (0 to 5)', control: 'number', min: 0, max: 5 },
    reviewCount: { type: Number, default: null, label: 'How many have rated it', control: 'number', min: 0 },
    reviews: {
      type: Array,
      default: () => [],
      label: 'Reviews',
      control: 'list',
      fields: [{ key: 'author', label: 'Who wrote it' }, { key: 'rating', label: 'Stars (1 to 5)', control: 'number' }, { key: 'text', label: 'What they said', control: 'textarea' }, { key: 'date', label: 'When', placeholder: '2026-11-15' }]
    },
    reviewsTitle: { type: String, default: '', label: 'Over the reviews', placeholder: 'Reviews' },
    canReview: { type: Boolean, default: false, label: 'Let visitors write a review' },
    reviewSource: { type: String, default: '', label: 'Send reviews to your backend (a source in Data)', control: 'source' },
    reviewPath: { type: String, default: '', label: 'Its route', placeholder: '/reviews' },
    kicker: { type: String, default: '', label: 'A word over the name', placeholder: 'New in' },
    variantLabel: { type: String, default: '', label: 'Over the kinds', placeholder: 'Choose' },
    quantityLabel: { type: String, default: '', label: 'How many', placeholder: 'How many' },
    addText: { type: String, default: '', label: 'Add to cart', placeholder: 'Add to cart' },
    addedText: { type: String, default: '', label: 'Said when added', placeholder: 'Added to the cart' },
    soldOutText: { type: String, default: '', label: 'Said when sold out', placeholder: 'Sold out' },
    buyNow: { type: Boolean, default: false, label: 'A Buy now button (straight to paying)' },
    buyNowText: { type: String, default: '', label: 'Its text', placeholder: 'Buy now' },
    saleText: { type: String, default: '', label: 'Word when on sale', placeholder: 'Sale' },
    url: { type: String, default: '', label: 'Its address (for search engines)', placeholder: 'https://shop.example/products/shirt' },
    seo: { type: Boolean, default: true, label: 'Tell search engines about the product' },
    layout: { type: String, default: 'side', label: 'Layout', control: 'select', options: [{ key: 'Pictures beside the words', value: 'side' }, { key: 'Pictures above the words', value: 'stacked' }] },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  emits: ['added', 'reviewed'],
  data() {
    return { chosen: 0, quantity: 1, shownPicture: 0, added: false, drawn: false, mine: { rating: 0, name: '', text: '' }, hovered: 0, state: '', failure: '', found: {} }
  },
  computed: {
    lang() {
      let lang = ''
      try {
        const head = this.$root?.$options?.head
        lang = (typeof head === 'function' ? head.call(this.$root) : head)?.htmlAttrs?.lang || ''
      } catch (e) {}
      if (!lang && typeof document !== 'undefined') lang = document.documentElement.lang || ''
      return String(lang || 'en').toLowerCase()
    },
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    uid() {
      return this.$?.uid ?? 0
    },
    sample() {
      return !this.title && this.inStudio
    },
    product() {
      const own = { id: this.id, title: this.title, price: this.price, compare: this.compare, currency: this.currency, description: this.description, text: this.text, brand: this.brand, rating: this.rating, reviewCount: this.reviewCount }
      return this.sample ? { ...SAMPLE, ...Object.fromEntries(Object.entries(own).filter(([, v]) => v !== '' && v !== null && v !== undefined)) } : own
    },
    pictureNames() {
      return this.pictures.filter(one => /^--/.test(one))
    },
    pictures() {
      const list = [this.image, ...(Array.isArray(this.images) ? this.images : []).map(one => typeof one === 'string' ? one : one?.src || one?.url || '')]
      return [...new Set(list.filter(Boolean))]
    },
    // A variant from Shopify ({ id, title, price: { amount }, availableForSale }) or from the list here
    kinds() {
      return (Array.isArray(this.variants) ? this.variants : []).map(one => ({
        id: String(one?.id ?? ''),
        title: one?.title || '',
        price: one?.price?.amount ?? one?.price ?? '',
        available: one?.availableForSale ?? one?.available ?? true
      }))
    },
    variant() {
      return this.kinds[this.chosen] || { id: this.product.id, title: '', price: '', available: true }
    },
    chosenPrice() {
      return this.variant.price !== '' && this.variant.price !== undefined && this.variant.price !== null ? this.variant.price : this.product.price
    },
    onSale() {
      return Number(this.product.compare) > Number(this.chosenPrice)
    },
    // (the description's words, until it is drawn: on the server, and for a moment in the browser)
    plainDescription() {
      return String(this.product.description || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\\s+/g, ' ').trim()
    },
    canBuy() {
      return this.variant.available && (!!(this.variant.id || this.product.id) || this.inStudio)
    },
    // The reviews, each { author, rating, text, date } (also read from name/title/body/content/created_at)
    reviewList() {
      const list = Array.isArray(this.reviews) && this.reviews.length ? this.reviews : this.sample ? SAMPLE_REVIEWS : []
      return list.filter(one => one && typeof one === 'object').map(one => {
        const rating = Number(one.rating ?? one.stars)
        return {
          author: String(one.author?.name ?? one.author ?? one.name ?? ''),
          rating: rating > 0 ? Math.round(Math.min(5, rating) * 10) / 10 : 0,
          text: String(one.text ?? one.body ?? one.content ?? ''),
          date: String(one.date ?? one.created_at ?? one.createdAt ?? '')
        }
      })
    },
    // The stars: the rating set, else the reviews' average
    stars() {
      const own = Number(this.product.rating)
      if (own > 0) return Math.round(Math.min(5, own) * 10) / 10
      const rated = this.reviewList.filter(one => one.rating)
      return rated.length ? Math.round(rated.reduce((sum, one) => sum + one.rating, 0) / rated.length * 10) / 10 : 0
    },
    ratedBy() {
      const own = Math.round(Number(this.product.reviewCount))
      return own > 0 ? own : this.reviewList.filter(one => one.rating).length
    },
    ratingLabel() {
      return this.say('rated', '', this.number(this.stars)) + (this.ratedBy ? ', ' + this.say(this.ratedBy === 1 ? 'review1' : 'reviewN', '', this.ratedBy) : '')
    },
    showReviews() {
      return this.canReview || this.reviewList.length > 0
    },
    signedInName() {
      return this.vpData?.auth?.user?.name || ''
    },
    style() {
      return { '--vp-product-details-radius': this.radius || undefined }
    }
  },
  watch: {
    'product.description'() { this.$nextTick(() => this.drawDescription()) },
    kinds: { immediate: true, handler(list) { const first = list.findIndex(one => one.available); this.chosen = first < 0 ? 0 : first } },
    pictures() { this.shownPicture = 0 },
    pictureNames() { this.$nextTick(() => this.findPictures()) },
    signedInName: { immediate: true, handler(name) { if (name && !this.mine.name) this.mine.name = name } }
  },
  mounted() {
    this.drawDescription()
    this.findPictures()
  },
  methods: {
    // A picture picked in the Studio is the name of a variable that holds it (--image-mug): shown through that
    // variable at once, and its address read from it when the page is alive. An address is used as it is.
    address(value) {
      return /^--/.test(value || '') ? this.found[value] || '' : value || ''
    },
    held(value) {
      return /^--/.test(value || '') && !this.found[value] ? { content: 'var(' + value + ')' } : undefined
    },
    findPictures() {
      if (!this.$el || this.$el.nodeType !== 1 || typeof getComputedStyle === 'undefined') return
      const style = getComputedStyle(this.$el)
      const found = {}
      for (const name of this.pictureNames) {
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(name))
        if (address) found[name] = address[2]
      }
      this.found = found
    },
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    // (how much of the five stars is filled: 4.6 is 0.92)
    part(rating) {
      return Math.round(Math.min(5, Math.max(0, Number(rating) || 0)) / 5 * 1000) / 1000
    },
    number(value) {
      try { return Number(value).toLocaleString(this.lang) } catch (e) { return String(value) }
    },
    day(date) {
      const when = new Date(date)
      if (Number.isNaN(when.getTime())) return date
      try { return when.toLocaleDateString(this.lang, { year: 'numeric', month: 'long', day: 'numeric' }) } catch (e) { return date }
    },
    // The shop's description, made again of elements from a short list (never read as HTML: what is not on the list
    // stays as its words), so a description cannot run anything on the page
    drawDescription() {
      const box = this.$refs.about
      if (!box || typeof DOMParser !== 'function' || !this.product.description) return
      const OK = ['P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'A', 'SPAN', 'DIV', 'TABLE', 'TBODY', 'TR', 'TD', 'TH']
      const copy = (from, to) => {
        for (const node of from.childNodes) {
          if (node.nodeType === 3) to.appendChild(document.createTextNode(node.textContent))
          else if (node.nodeType === 1) {
            if (!OK.includes(node.tagName)) { copy(node, to); continue }
            const el = document.createElement(node.tagName.toLowerCase())
            const href = node.tagName === 'A' ? node.getAttribute('href') || '' : ''
            if (href && /^(https?:|\\/|#)/i.test(href)) { el.setAttribute('href', href); el.setAttribute('rel', 'noopener') }
            copy(node, el)
            to.appendChild(el)
          }
        }
      }
      const parsed = new DOMParser().parseFromString(String(this.product.description), 'text/html')
      box.replaceChildren()
      copy(parsed.body, box)
      this.drawn = true
    },
    priceText(amount) {
      if (this.vpData?.money) return this.vpData.money(amount, this.product.currency, this.lang)
      const value = Number(amount) || 0
      try { return this.product.currency ? value.toLocaleString(this.lang, { style: 'currency', currency: this.product.currency }) : value.toFixed(2) } catch (e) { return value.toFixed(2) }
    },
    line() {
      return {
        id: this.variant.id || this.product.id,
        title: this.product.title + (this.kinds.length > 1 && this.variant.title ? ' · ' + this.variant.title : ''),
        price: Number(this.chosenPrice) || 0,
        currency: this.product.currency,
        image: this.address(this.pictures[0]) || ''
      }
    },
    add() {
      const quantity = Math.max(1, Math.min(99, Math.round(Number(this.quantity) || 1)))
      if (!this.inStudio) this.vpData?.addToCart?.(this.line(), quantity)
      this.$emit('added', this.line())
      this.added = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.added = false }, 1800)
    },
    async now() {
      if (this.inStudio) return
      this.vpData?.addToCart?.(this.line(), Math.max(1, Math.round(Number(this.quantity) || 1)), { open: false })
      await this.vpData?.checkout?.()
    },
    toReviews() {
      const box = this.$refs.reviews
      if (box?.scrollIntoView) box.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    // A review goes to a route of the site's own backend: { product, rating, name, text }
    async sendReview() {
      if (this.state === 'sending') return
      const rating = Math.round(Number(this.mine.rating) || 0)
      if (rating < 1 || rating > 5) { this.state = 'failed'; this.failure = this.say('pick'); return }
      const body = { product: this.product.id || this.product.title, rating, name: String(this.mine.name || '').trim(), text: String(this.mine.text || '').trim() }
      this.failure = ''
      if (this.inStudio) { this.state = 'sent'; return }
      if (!this.reviewSource || !this.vpData?.send) { this.state = 'failed'; return }
      this.state = 'sending'
      let answer
      try { answer = await this.vpData.send(this.reviewSource, this.reviewPath || '/reviews', body) } catch (e) { answer = { ok: false } }
      if (answer?.ok) {
        this.state = 'sent'
        this.$emit('reviewed', body)
        return
      }
      this.state = 'failed'
      this.failure = answer?.error && answer.error.length < 160 ? String(answer.error) : ''
    }
  },
  // What search engines read about the product (on the site, not in the editor): name, pictures, price, stock,
  // its rating and some reviews
  head() {
    const product = this.product
    if (!this.seo || this.inStudio || !product.title) return {}
    const about = this.plainDescription || String(product.text || '').trim()
    const amount = Number(this.chosenPrice)
    const hasPrice = this.chosenPrice !== null && this.chosenPrice !== undefined && this.chosenPrice !== '' && Number.isFinite(amount)
    const address = this.url || (typeof window !== 'undefined' && window.location ? window.location.origin + window.location.pathname : '')
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: String(product.title),
      ...(this.pictures.some(one => this.address(one)) ? { image: this.pictures.map(one => this.address(one)).filter(Boolean) } : {}),
      ...(about ? { description: about } : {}),
      ...(this.sku || product.id ? { sku: String(this.sku || product.id) } : {}),
      ...(product.brand ? { brand: { '@type': 'Brand', name: String(product.brand) } } : {}),
      ...(hasPrice ? {
        offers: {
          '@type': 'Offer',
          price: amount,
          ...(product.currency ? { priceCurrency: String(product.currency) } : {}),
          availability: this.variant.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          ...(address ? { url: address } : {})
        }
      } : {}),
      ...(this.stars > 0 && this.ratedBy > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: this.stars, reviewCount: this.ratedBy, bestRating: 5 } } : {})
    }
    const reviews = this.reviewList.filter(one => one.text || one.rating).slice(0, 5)
    if (reviews.length) {
      schema.review = reviews.map(one => ({
        '@type': 'Review',
        ...(one.author ? { author: { '@type': 'Person', name: one.author } } : {}),
        ...(one.rating ? { reviewRating: { '@type': 'Rating', ratingValue: one.rating, bestRating: 5 } } : {}),
        ...(one.text ? { reviewBody: one.text } : {}),
        ...(one.date ? { datePublished: one.date } : {})
      }))
    }
    return { script: [{ type: 'application/ld+json', textContent: schema }] }
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  }
}
<\/script>
<style>
.vp-product-details {
  --_radius: var(--vp-product-details-radius, var(--vp-radius, 12px));
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: start;
  width: 100%;
}
.vp-product-details--stacked { grid-template-columns: minmax(0, 1fr); max-width: 44rem; margin: 0 auto; }
@media (max-width: 760px) { .vp-product-details { grid-template-columns: minmax(0, 1fr); } }
.vp-product-details__pictures { display: flex; flex-direction: column; gap: 0.75rem; }
.vp-product-details__main { position: relative; overflow: hidden; aspect-ratio: 4 / 5; border-radius: var(--_radius); background: var(--vp-surface, #f4f4f5); }
.vp-product-details__main img { width: 100%; height: 100%; object-fit: cover; }
.vp-product-details__none { display: grid; place-items: center; width: 100%; height: 100%; background: linear-gradient(140deg, #fde2d1, #f6b8c6); color: #8a3f52; font-size: 4rem; font-weight: 700; }
.vp-product-details__sale { position: absolute; top: 1rem; left: 1rem; padding: 0.3rem 0.75rem; border-radius: 999px; background: #dc2626; color: #fff; font-size: 0.8rem; font-weight: 650; }
.vp-product-details__thumbs { display: flex; gap: 0.5rem; overflow-x: auto; }
.vp-product-details__thumb { flex: none; width: 4.5rem; aspect-ratio: 1; padding: 0; overflow: hidden; border: 2px solid transparent; border-radius: calc(var(--_radius) - 4px); background: none; cursor: pointer; opacity: 0.7; transition: opacity 150ms ease, border-color 150ms ease; }
.vp-product-details__thumb img { width: 100%; height: 100%; object-fit: cover; }
.vp-product-details__thumb--on, .vp-product-details__thumb:hover { opacity: 1; border-color: var(--vp-primary, #2563eb); }
.vp-product-details__words { display: flex; flex-direction: column; gap: 1.1rem; }
.vp-product-details__kicker { margin: 0; font-size: 0.8rem; font-weight: 650; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vp-primary, #2563eb); }
.vp-product-details__title { margin: 0; font-family: var(--vp-heading, inherit); font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.1; }
.vp-product-details__price { display: flex; gap: 0.75rem; align-items: baseline; margin: 0; font-size: 1.35rem; font-weight: 600; }
.vp-product-details__price s { font-size: 1rem; font-weight: 400; opacity: 0.55; }
.vp-product-details__label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; }
.vp-product-details__choices { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.vp-product-details__choice {
  min-width: 3rem;
  padding: 0.55rem 0.9rem;
  border: 1.5px solid var(--vp-border, rgba(127, 127, 127, 0.35));
  border-radius: calc(var(--_radius) - 4px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;
}
.vp-product-details__choice:hover:not(:disabled) { border-color: currentColor; }
.vp-product-details__choice--on { border-color: var(--vp-primary, #2563eb); background: color-mix(in srgb, var(--vp-primary, #2563eb) 10%, transparent); font-weight: 600; }
.vp-product-details__choice--out { opacity: 0.4; text-decoration: line-through; cursor: not-allowed; }
.vp-product-details__buy { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.vp-product-details__quantity { display: inline-flex; align-items: center; border: 1.5px solid var(--vp-border, rgba(127, 127, 127, 0.35)); border-radius: var(--vp-radius, 8px); }
.vp-product-details__quantity button { width: 2.6rem; height: 3rem; border: 0; background: none; color: inherit; font: inherit; font-size: 1.15rem; cursor: pointer; }
.vp-product-details__quantity button:disabled { opacity: 0.35; cursor: default; }
.vp-product-details__quantity input { width: 2.6rem; border: 0; background: none; color: inherit; font: inherit; text-align: center; -moz-appearance: textfield; }
.vp-product-details__quantity input::-webkit-inner-spin-button { -webkit-appearance: none; }
.vp-product-details__add, .vp-product-details__now {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 12rem;
  min-height: 3rem;
  padding: 0 1.5rem;
  border: 0;
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease;
}
.vp-product-details__now { flex: none; width: 100%; background: transparent; color: inherit; box-shadow: inset 0 0 0 1.5px currentColor; }
.vp-product-details__add:hover:not(:disabled) { filter: brightness(1.08); }
.vp-product-details__add:active:not(:disabled) { transform: translateY(1px); }
.vp-product-details__add:disabled, .vp-product-details__now:disabled { opacity: 0.5; cursor: not-allowed; }
.vp-product-details__add svg { width: 1.1rem; height: 1.1rem; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.vp-product-details__about { margin: 0.5rem 0 0; padding-top: 1.25rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.2)); line-height: 1.7; }
.vp-product-details__about img { max-width: 100%; height: auto; }
.vp-product-details__plain { margin: 0; }
.vp-product-details__drawn > :first-child { margin-top: 0; }
.vp-product-details__rating { display: inline-flex; align-self: flex-start; align-items: center; gap: 0.4rem; margin: -0.4rem 0 0; padding: 0; border: 0; background: none; color: inherit; font: inherit; font-size: 0.875rem; cursor: pointer; }
.vp-product-details__rating:hover .vp-product-details__count { text-decoration: underline; text-underline-offset: 3px; }
.vp-product-details__score { font-weight: 600; }
.vp-product-details__count { opacity: 0.65; }
.vp-product-details__stars {
  position: relative;
  display: inline-block;
  font-size: 1rem;
  line-height: 1;
  letter-spacing: 0.08em;
  color: color-mix(in srgb, currentColor 22%, transparent);
}
.vp-product-details__stars::before { content: '★★★★★'; }
.vp-product-details__stars::after {
  content: '★★★★★';
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: calc(var(--vp-product-details-stars, 0) * 100%);
  color: var(--vp-rating, #f59e0b);
  white-space: nowrap;
}
.vp-product-details__reviews { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 1.5rem; padding-top: 2rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.2)); scroll-margin-top: 5rem; }
.vp-product-details__reviews-head { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; align-items: baseline; }
.vp-product-details__reviews-head h2 { margin: 0; font-family: var(--vp-heading, inherit); font-size: clamp(1.35rem, 3vw, 1.75rem); }
.vp-product-details__average { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin: 0; font-size: 0.95rem; }
.vp-product-details__no-reviews { margin: 0; opacity: 0.65; }
.vp-product-details__review-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); gap: 1rem; margin: 0; padding: 0; list-style: none; }
.vp-product-details__review { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.1rem 1.2rem; border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.2)); border-radius: var(--_radius); }
.vp-product-details__review p { margin: 0; }
.vp-product-details__review-by { display: flex; flex-wrap: wrap; gap: 0.25rem 0.75rem; align-items: baseline; font-size: 0.9rem; }
.vp-product-details__review-by time { opacity: 0.6; font-size: 0.85rem; }
.vp-product-details__review-text { line-height: 1.6; white-space: pre-line; }
.vp-product-details__write { display: flex; flex-direction: column; gap: 0.9rem; max-width: 36rem; }
.vp-product-details__write h3 { margin: 0; font-size: 1.1rem; }
.vp-product-details__picker { display: flex; gap: 0.15rem; margin: 0; padding: 0; border: 0; }
.vp-product-details__picker legend { width: 100%; margin-bottom: 0.35rem; padding: 0; font-size: 0.875rem; font-weight: 600; }
.vp-product-details__pick { position: relative; font-size: 1.75rem; line-height: 1; color: color-mix(in srgb, currentColor 25%, transparent); cursor: pointer; transition: color 120ms ease, transform 120ms ease; }
.vp-product-details__pick input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.vp-product-details__pick--on { color: var(--vp-rating, #f59e0b); }
.vp-product-details__pick:hover { transform: scale(1.12); }
.vp-product-details__pick:has(input:focus-visible) { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; border-radius: 4px; }
.vp-product-details__field { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.875rem; font-weight: 600; }
.vp-product-details__field input, .vp-product-details__field textarea { padding: 0.65rem 0.8rem; border: 1.5px solid var(--vp-border, rgba(127, 127, 127, 0.35)); border-radius: var(--vp-radius, 8px); background: transparent; color: inherit; font: inherit; font-weight: 400; resize: vertical; }
.vp-product-details__field input:focus, .vp-product-details__field textarea:focus { outline: none; border-color: var(--vp-primary, #2563eb); }
.vp-product-details__send { align-self: flex-start; min-height: 2.75rem; padding: 0 1.4rem; border: 0; border-radius: var(--vp-radius, 8px); background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); font: inherit; font-weight: 650; cursor: pointer; }
.vp-product-details__send:disabled { opacity: 0.6; cursor: default; }
.vp-product-details__thanks { margin: 0; padding: 0.9rem 1rem; border-radius: var(--vp-radius, 8px); background: color-mix(in srgb, #16a34a 12%, transparent); }
.vp-product-details__problem { margin: 0; color: #dc2626; font-size: 0.9rem; }
.vp-product-details__studio { margin: 0; font-size: 0.8rem; opacity: 0.6; }
@media (prefers-reduced-motion: reduce) { .vp-product-details__pick { transition: none; } }
</style>
`;export{e as default};