<script setup lang="ts">
import MapWithBtn from './components/MapWithBtn.vue';
import Menu from './components/Menu.vue';
import SlideContainer from './components/SlideContainer.vue';
import Text from './components/Text.vue';
import Header from './components/Header.vue';
import BackgroundRotatingImages from './components/BackgroundRotatingImages.vue';


const menuItems = [
  { label: 'Ceremonia', labelEng: 'Ceremony', target: '#Ceremony-Sec' },
  { label: 'Przyjęcie', labelEng: 'Party', target: '#Party-Sec' },
  { label: 'Obecnosć', labelEng: 'RSVP', target: '#RSVP-Sec' },
  { label: 'Piosenki', labelEng: 'Songs', target: '#Songs-Sec' }
]
</script>

<template>
  <div class="page">
    <div class="main">
      <BackgroundRotatingImages />
      <Header />
      <div>
        <div class="sidebar">
          <Menu :items="menuItems" />
        </div>
        <div id="Ceremony-Sec" class="sectionContainer">
          <SlideContainer direction="left" :threshold="600">
            <MapWithBtn
              :lat="52.6260985"
              :lng="18.5271619"
              title="Ceremonia Ślubna"
              titleEng="Wedding Ceremony"
              text="Otwórz w Google Maps"
              textEng="Open in Google Maps"
              :zoom="16",
              google_location="Franciscan Monastery, Klasztor Ojców Franciszkanów, Radziejów"
            />
          </SlideContainer>
        </div>
        <div id="Party-Sec" class="sectionContainer">
          <SlideContainer direction="left" :threshold="600">
            <MapWithBtn
              :lat="52.5665085"
              :lng="18.5248701"
              title="Wesele"
              titleEng="Wedding Party"
              text="Otwórz w Google Maps"
              textEng="Open in Google Maps"
              :zoom="13",
              google_location="Kaczewska Stodoła, Kaczewo 12, 88-230 Kaczewo"
            />
          </SlideContainer>
        </div>
        <div id="RSVP-Sec" class="sectionContainer">
          <SlideContainer direction="right" :threshold="900">
              <Text text="Swoją obecność możesz potwierdzić do 30 czerwca telefonicznie lub poprzez formularz." textEng="If you want to confirm your attendance at the wedding, please contact us by phone or fill out the form." size="content" />
              <Text text="Wiktoria - 570 029 779" textEng="Wiktoria - 570 029 779" size="content" />
              <Text text="Szymon - 883 005 776" textEng="Szymon - 883 005 776" size="content" />
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScffwjSOTucyoB4mwnSOzMoRbRV-vUM7y3XtxUIPUlsEKUAIQ/viewform?embedded=true" width="100%" height="890" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </SlideContainer>
        </div>
        <div id="Songs-Sec" class="sectionContainer">
          <SlideContainer direction="right" :threshold="300">
              <Text text="Już dzisiaj możesz zgłosić swoją ulubioną piosenkę, a my postaramy się ją uwzględnić podczas zabawy weselnej." textEng="You can already submit your favorite song today, and we will try to include it during the wedding party." size="content" />
              <Text text="Anikietę będzie otwarta do 15 lipca." textEng="The guest book will be open until July 15th." size="label" />
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe4bkX-BWtS3CSmxcMJCDS-AZhkdtaLZft_aiiTk85d1a3PFw/viewform?embedded=true" width="100%" height="424" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </SlideContainer>
        </div>
        <!-- <div id="Gifts-Sec" class="sectionContainer">
          <SlideContainer direction="right" :threshold="200">
            <div class="gifts-sec">
              <div class="column-1">
                <Text text="Jeżeli chcesz obdarować nas prezentem, to w tym miejscu znajdziesz listę naszych propozycji." textEng="If you want to give us a gift, here you will find a list of our suggestions." size="content" />
              </div>
              <img src="/src/assets/gifts.png" alt="Prezenty" class="column-1"/>
            </div>
          </SlideContainer>
        </div>!-->
      </div>
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
  background-color: var(--primary);
}

.columnContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-xl);
}

.sidebar {
  width: 0;
  overflow: visible;
  height: 0;
  position: sticky;
  top: var(--spacing-lg);
  z-index: 1000;
  transform: translateX(-10%);
}
.sectionContainer {
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
.lang-switcher {
  /* ===== Local variables — define before use ===== */
  --lang-switcher-gap: var(--spacing-sm);
  --lang-switcher-padding: var(--spacing-md);

  display: flex;
  justify-content: flex-end;
  padding: var(--lang-switcher-padding);
  gap: var(--lang-switcher-gap);
}
.page {
  gap: var(--spacing-lg);
}
.main {
  flex: 1;
}

.gifts-sec {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
}

.column-1{
  flex-grow: 1;
  width: 25%;
}

@media (max-width: 768px) {
  .gifts-sec{
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  .column-1{
    flex-grow: 1;
    width: 100%;
  }
}
</style>
