<template>
  <article class="content sub state locate">
    <div class="inner">
      <ul class="locator">
        <li v-for="(lib, i) in libList" :key="i" :class="activeLib(lib)" @click="clickLib(lib)">
          <span class="t">{{ lib.name }}</span>
        </li>
        <li>
          <span class="t">작은도서관</span>
          <ul>
            <li
              v-for="(lib, i) in subLibList"
              :key="i"
              :class="activeLib(lib)"
              @click="clickLib(lib)"
            >
              {{ lib.name }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="location">
        <div class="map">
          <div class="mapInfo" style="z-index: 1">
            <h3 class="heading">{{ selectedLib.name }}도서관</h3>
            <a class="ads">{{ selectedLib.location }}</a>
            <a :href="`tel:${selectedLib.tel}`" class="tel">{{ selectedLib.tel }}</a>
          </div>
          <div class="mapImg"><img :src="selectedLib.imageSrc" :alt="selectedLib.imageSrc" /></div>
        </div>
        <div class="mapData">
          <ul>
            <li>{{ selectedLib.location }}</li>
            <li>전화 : {{ selectedLib.tel }}</li>
            <li v-if="selectedLib.fax">팩스 : {{ selectedLib.fax }}</li>
          </ul>
          <dl v-if="!_.isEmpty(wayToSubway[0])">
            <dt>지하철</dt>
            <dd v-for="(step, i) in wayToSubway" :key="i">{{ step }}</dd>
          </dl>
          <dl v-if="!_.isEmpty(wayToBus[0])">
            <dt>버스</dt>
            <dd v-for="(step, i) in wayToBus" :key="i">{{ step }}</dd>
          </dl>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { LIBRARY_ADDRESS } from '@/store';
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    libList: [
      {
        name: '반포',
        imageSrc: require('@img/map/map1.png'),
        libCode: '111377',
        location: '(06599) 서울시 서초구 고무래로 34',
        tel: '02-520-8700',
        fax: '02-520-8720',
        subway:
          '9호선 사평역 2번 출구에서 약 500m(도보 5분)<br />7호선 반포역 3번 출구에서 약 900m(도보 10분)<br />3·7·9호선 고속터미널역 3번 출구에서 약 1,200m(도보 15분)',
        bus: '노선 :  지선버스 3012번<br />마을버스 : 서초01번, 서초02번, 서초10번<br />버스정류장 : 서초구립반포도서관(22-466), 삼호가든사거리(22-199), 미도아파트(22-218)'
      },
      {
        name: '내곡',
        imageSrc: require('@img/map/map2.png'),
        libCode: '111476',
        location: '(06799) 서울특별시 서초구 청계산로7길 9-20',
        tel: '02-3461-3007',
        fax: '02-3461-3008',
        subway: '신분당선 청계산입구역 1번출구에서 약 600m (도보 10분)',
        bus: '노선 : 지선버스 4432<br />마을버스 : 서초20번<br />버스정류장 : 청계산입구역(22401,22591)'
      },
      {
        name: '양재',
        imageSrc: require('@img/map/map3.png'),
        libCode: '111493',
        location: '(06755) 서울특별시 서초구 양재천로33',
        tel: '02-3486-4050',
        fax: '02-3486-4060',
        subway: '양재역 11번 출구 도보 25분<br />양재시민의숲역(신분당) 1번 출구 도보 13분',
        bus: '우성아파트, 양재초등학교(22-276) 133m<br />- 간선 542<br />- 지선 3412, 4435<br />- 마을 서초08, 서초18, 서초18-1<br />우성아파트, 양재초등학교(22-275) 184m<br />- 간선 542<br />- 지선 3412, 4435<br />- 마을 서초08, 서초18, 서초18-1'
      },
      {
        name: '서초청소년',
        imageSrc: require('@img/map/map4.png'),
        libCode: '111503',
        location: '(06629) 서울특별시 서초구 효령로77길 37',
        tel: '02-3486-9543',
        fax: '02-3486-9548',
        subway: '강남역 5번 출구에서 도보 7분<br />양재역 2번 출구에서 도보 17분',
        bus: '서초청소년도서관<br />- 144, 145, 350, 643, 8541, 서초03<br />수협서초지점<br />- 144, 145, 340, 3412, 4412<br />래미안리더스원<br />- 140, 400, 402, 420, 421, 440, 441, 452, 470, 541, 542, 741'
      },
      {
        name: '서이',
        imageSrc: require('@img/map/map5.png'),
        libCode: '111466',
        location: '(06624) 서울특별시 서초구 서초대로70길 51',
        tel: '02-3471-1337',
        fax: '02-3471-1336',
        subway:
          '2호선 강남역 : 7번 출구 - 우성아파트 사거리까지 직진 - 우회전 서이초교사거리 - 서초2동 주민센터골목<br />2호선 강남역 : 9번출구 - 마을버스 11번 - 우성2차아파트 하차 - 현대할인마트에서 우회전 - 200M 직진후 서초2동주민센터 골목<br />2호선 교대역 : 5번출구 - 마을버스 서초03번 - 신동아아파트 정류장 하차<br />3호선 교대역 : 13번출구 - 마을버스 서초03번 - 신동아아파트 정류장 하차<br />신분당선 강남역 : 5번출구 - 우성아파트사거리 직진 - 우회전 - 서이초교사거리 - 주민센터<br />3호선 양재역 : 1번출구 - 마을버스 서초21번 - 서초2동사무소 하차 - 서초2동주민센터 골목',
        bus: '일반버스 : 144번, 350번<br />마을버스 : 서초03번, 서초11번, 서초21번'
      },
      {
        name: '잠원',
        imageSrc: require('@img/map/map6.png'),
        libCode: '111140',
        location: '(06523) 서울특별시 서초구 나루터로38',
        tel: '02-3477-8655',
        fax: '02-3477-8656',
        subway:
          '잠원역 4번출구 → 서초여성가족플라자 길건너 잠원동주민센터 교차로까지 230m 직진 → 잠원동 주민센터 3층',
        bus: '143번 신동중학교 98m, 신반포13차아파트 212m<br />서초01번 마을버스 잠원역, 매일상가 앞 하차'
      },
      {
        name: '방배',
        imageSrc: require('@img/map/map7.png'),
        libCode: '111236',
        location: ' (06705) 서울특별시 서초구 방배로40',
        tel: '02-3471-3993',
        fax: '02-3471-3995',
        subway: '방배역1번출구에서 약 400m 직진',
        bus: '간선버스 : 641<br />지선버스 : 17'
      },
      {
        name: '서초그림책',
        imageSrc: require('@img/map/map8.png'),
        libCode: '111477',
        location: '서울특별시 서초구 서초동 1498-4 교통섬 일대',
        tel: '02-3471-0995',
        fax: '02-3471-0998',
        subway:
          '2호선 서초역 : 4번 출구 - 서리풀터널까지 직진<br />2호선 교대역 : 7번출구 - 마을버스 서초02번 – 서초역 정류장 하차<br />2호선 교대역 : 10번출구 - 마을버스 서초10번 – 서초역 정류장 하차',
        bus: '일반버스 : 405번, 5413번<br />마을버스 : 서초02번, 서초11번 - 서초고 후문 하차<br />서초21번 - 서초역 하차'
      }
    ],
    subLibList: [
      {
        name: '서초1동',
        imageSrc: require('@img/map/map9.png'),
        libCode: '111224',
        location: '서울특별시 서초구 사임당로 89',
        tel: '02-2155-7418',
        fax: '',
        subway:
          '교대역 1번출구 → 서초리시온아파트 골목길 400m 직진 → 삼거리에서 서울교육대학교<br />담장을 따라 350m 직진 → 횡단보도 나오면 좌측으로 70m',
        bus: '21번 마을버스(대복마을버스) 서초1동주민센터앞 하차'
      },
      {
        name: '서초3동',
        imageSrc: require('@img/map/map10.png'),
        libCode: '111250',
        location: '서울특별시 서초구 반포대로 58',
        tel: '02-3472-7462',
        fax: '',
        subway: '3호선 남부터미널역 6번출구에서 약 500m<br />2호선 서초역 2번출구에서 약 1,100m',
        bus: '마을버스 : 서초11번 서초아트자이아파트 정류장<br />간선버스 : 405, 541<br />지선버스 : 5413'
      },
      {
        name: '서초4동',
        imageSrc: require('@img/map/map11.png'),
        libCode: '111251',
        location: '서울특별시 서초구 서운로 26길 3',
        tel: '02-2155-7512',
        fax: '',
        subway:
          '9호선 신논현역 7번출구(도보5분, 300m)<br />2호선·신분당선 강남역 10번 출구(도보 12분, 750m)',
        bus: '신논현역, 교보타워사거리 하차(도보 7분)<br />서초푸르지오써밋, 롯데캐슬클래식 하차(도보 3분)'
      },
      {
        name: '반포본동',
        imageSrc: require('@img/map/map12.png'),
        libCode: '111138',
        location: '서울특별시 서초구 신반포로 10',
        tel: '02-2155-7577',
        fax: '',
        subway:
          '4호선 동작역 1번출구 이수교차로 방향 300m<br />9호선 구반포역 1번출구 이수교차로 방향 100m',
        bus: '구반포하차 이수교차로 방향 150m'
      },
      {
        name: '반포1동',
        imageSrc: require('@img/map/map13.png'),
        libCode: '111136',
        location: '서울특별시 서초구 사평대로 273',
        tel: '02-2155-7615',
        fax: '',
        subway:
          '7호선 반포역 1번 출구에서 약 300m 반포자이아파트 내 원촌초교 운동장 앞<br />9호선 사평역 1번 출구에서 약 70m',
        bus: '지하철 사평역<br />간선버스 : 642,643<br />지선버스 : 3422,8541'
      },
      {
        name: '반포2동',
        imageSrc: require('@img/map/map14.png'),
        libCode: '111249',
        location: '서울특별시 서초구 신반포로15길 16',
        tel: '02-2155-7635',
        fax: '',
        subway: '신반포역 1번출구에서 20m 직진후, 우측방향으로 100m 직진',
        bus: '신반포역 버스정류장<br />간선버스 : 148, 360, 362, 406, 462, 540, 640, 642, 643<br />지선버스 : 4212, 4318, 6411'
      },
      {
        name: '반포3동',
        imageSrc: require('@img/map/map15.png'),
        libCode: '111247',
        location: '서울특별시 서초구 신반포로 23길 78',
        tel: '02-2155-7670',
        fax: '',
        subway:
          '고속터미널역(3,7,9호선) 8-2번 출구 도보6분<br />반포역(7호선) 4번출구 도보 14분<br />잠원역(3호선) 3번출구 도보 14분',
        bus: '한신2차정문(22843) 48m<br />지선버스 : (마을) 서초14번'
      },
      {
        name: '반포4동',
        imageSrc: require('@img/map/map16.png'),
        libCode: '111243',
        location: '서울특별시 서초구 사평대로 28길 70',
        tel: '02-2155-7703',
        fax: '',
        subway:
          '고속터미널(3,7,9호선) 5번출구로 나와 길건너 팔레스호텔에서 이수교차로방면 사평로 길 따라 500m(7<br />분) 정도 걸어오시면 하나은행(코웰빌딩) 골목으로 400m(7분)정도 직진',
        bus: '간선버스 : 142,342<br />지선버스 : 13, 14, 21'
      },
      {
        name: '방배본동',
        imageSrc: require('@img/map/map17.png'),
        libCode: '111141',
        location: '서울특별시 서초구 동광로 19길 38',
        tel: '02-2155-7734',
        fax: '',
        subway: '7호선 내방역 하차 6번출구에서 약 900m 함지박사거리 인근',
        bus: '방배프라자 정류장 하차<br />간선버스 : 142, 148, 406'
      },
      {
        name: '방배1동',
        imageSrc: require('@img/map/map18.png'),
        libCode: '111163',
        location: '서울특별시 서초구 효령로 29길 43',
        tel: '02-2155-7765',
        fax: '',
        subway:
          '2호선 방배역 3번출구에서 약 250m 아크로타워 주상복합 뒤<br />7호선 내방역 3번출구에서 약 700m 아크로타워 주상복합 뒤<br />지하철 사당역 간서 (마을버스 17번 )',
        bus: '방림시장 정류장 하차<br />지선버스 : 17'
      },
      {
        name: '방배2동',
        imageSrc: require('@img/map/map19.png'),
        libCode: '111142',
        location: '서울특별시 서초구 청두곶길 36',
        tel: '02-2155-7794',
        fax: '',
        subway:
          '사당역(2,4호선) 11번(방배경찰서, 이수초등교)출구 → LPG충전소에서 우회전 (남태령 지구대와 LPG충전<br />소 사잇길) → 사잇길 끝에서 좌회전',
        bus: '지하철 사당동<br />간선버스 : 350, 502, 540, 643<br />지선버스 : 4212, 4318, 4319, 5524, 8541<br />마을버스 : 동작09, 동작16, 동작18, 서초6, 서초16, 서초17'
      },
      {
        name: '방배4동',
        imageSrc: require('@img/map/map20.png'),
        libCode: '111146',
        location: '서울특별시 서초구 방배로 173,3층',
        tel: '02-2155-7851',
        fax: '',
        subway: '내방역6번출구로 나와 방배로 방면 125m 이동 후 통일약국에서 왼쪽길로 43m 이동',
        bus: '간선버스 : 142, 148, 406<br />지선버스 : 4319<br />마을버스 : 서초15'
      },
      {
        name: '양재1동',
        imageSrc: require('@img/map/map21.png'),
        libCode: '111246',
        location: '서울특별시 서초구 바우뫼로 41 (우면동)',
        tel: '02-2155-7895',
        fax: '',
        subway: '3호선 양재역 하차 11번출구→마을버스 서초18번 코오롱(아)하차',
        bus: ''
      },
      {
        name: '양재2동',
        imageSrc: require('@img/map/map22.png'),
        libCode: '111244',
        location: '서울특별시 서초구 강남대로12길 44',
        tel: '02-2155-7906',
        fax: '',
        subway: '신분당선 양재시민의숲역 3번출구에서 약 300m 서초우체국 지나 양재근린공원 앞',
        bus: '일반버스 : 지하철 3호선 양재역 7번 출구 방향 버스(간선 140, 405, 407, 408, 421, 441, 462, 470, 471),<br />(지선 4432)이용 → 양재꽃시장(aT센터) 하차(10분소요) → 서초우체국 방향 → 양재근린공원 앞<br />마을버스 : 지하철 3호선 양재역 5번 출구 방향 마을버스(서초18)이용 → 매헌초등학교(양재2동 주민센터)<br />하차(25분소요)'
      }
    ],
    selectedLib: {}
  }),
  created() {
    this.initSetLib();
  },
  computed: {
    ...mapGetters({
      libraryAddress: LIBRARY_ADDRESS
    }),
    activeLib() {
      return lib => {
        return this.selectedLib === lib ? 'on' : '';
      };
    },
    wayToSubway() {
      return this.selectedLib.subway.split('<br />');
    },
    wayToBus() {
      return this.selectedLib.bus.split('<br />');
    }
  },
  methods: {
    ...mapActions({
      getLibraryAddress: LIBRARY_ADDRESS
    }),
    clickLib(lib) {
      this.selectedLib = lib;
      this.getLibraryAddress({ libCode: this.selectedLib.libCode });
    },
    initSetLib() {
      this.selectedLib = this.libList[0];
    }
  }
};
</script>

<style></style>
