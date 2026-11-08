/**
 * ============================================================================
 *  Spot photos — one photo per spot slug.
 * ============================================================================
 *  New spot photos live in /public/images/spots/<slug>.jpg (Wikimedia Commons,
 *  CC licences). Spots that already had a photo elsewhere on the site reuse it.
 *  Every spot photo is also added to /gallery, where its credit is shown.
 *
 *  To add a spot: save its photo as /public/images/spots/<slug>.jpg and add a
 *  line to SPOT_PHOTOS with the author, licence and Commons page URL.
 * ============================================================================
 */
import type { Photo } from "@/types/destination";
import { BOGA_LAKE_PHOTO, HERO_PHOTO, getAllSummaries, getDestinationBySlug } from "@/data/destinations";
import { withUnsplash } from "@/data/unsplash";
import { p } from "./photo-helpers";
import { PHOTOS_E } from "./photos-e";
import { PHOTOS_F } from "./photos-f";
import { PHOTOS_G } from "./photos-g";
import { PHOTOS_H } from "./photos-h";
import { PHOTOS_I } from "./photos-i";
import { PHOTOS_J } from "./photos-j";


/** Reuse a destination cover photo by destination slug. */
function cover(slug: string): Photo {
  const s = getAllSummaries().find((d) => d.slug === slug);
  if (!s) throw new Error(`Unknown destination cover: ${slug}`);
  return s.cover;
}

/** Reuse a photo that already lives in /public/images/gallery. */
function galleryPhoto(file: string, alt: string, caption: string, author: string, license: string, source: string): Photo {
  return { src: `/images/gallery/${file}`, alt, caption, credit: { author, license, source } };
}

const BASE_SPOT_PHOTOS: Record<string, Photo> = {
  "laboni-beach": p("laboni-beach.jpg", "People walking on the wet sand of Laboni Beach at sunset, reflected in the shallow water", "Sunset walk on Laboni Beach", "Istiaq roktim", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Cox_bazar_sea.jpg"),
  "himchari": p("himchari.jpg", "A thin waterfall dropping down a mossy rock face in Himchari National Park", "Himchari waterfall", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Himchari_Waterfall_(05).jpg"),
  "marine-drive": p("marine-drive.jpg", "The empty Marine Drive road running straight between lines of trees near the sea", "Marine Drive road", "Masum-al-Hasan Rocky", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Marine_drive_near_Lengurbill.jpg"),
  "ramu-buddhist-temples": p("ramu-buddhist-temples.jpg", "The giant golden reclining Buddha statue at Ramu with visitors in front", "The 100-ft reclining Buddha, Ramu", "TASBIR SOHAM", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:(100_Feet_Long_Gautama_Buddha_Structure).jpg"),
  "maheshkhali-island": p("maheshkhali-island.jpg", "Aerial view of a winding river channel through mangroves and salt fields on Maheshkhali", "Mangroves of Maheshkhali from above", "Ayman Nakib Badhan", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Falling_Guardians;_Mangroves_of_Maheshkhali_7.jpg"),
  "nilachal": p("nilachal.jpg", "Hilltop view from Nilachal over forested hills and Bandarban town", "View from Nilachal", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Nilachal,_Bandarban_(2Q7A0671).jpg"),
  "golden-temple-bandarban": p("golden-temple-bandarban.jpg", "The ornate golden spire of the Buddha Dhatu Jadi temple against a blue sky", "Buddha Dhatu Jadi (Golden Temple)", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Buddha_Dhatu_Jadi_(01).jpg"),
  "meghla": p("meghla.jpg", "A red hanging bridge over the green lake at Meghla tourist complex", "Hanging bridge at Meghla", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Meghla_Hanging_Bridge_I,_Bandarban_(9668).jpg"),
  "rangamati-hanging-bridge": p("rangamati-hanging-bridge.jpg", "The red suspension bridge stretching across Kaptai Lake in Rangamati", "Rangamati Hanging Bridge", "Shakhawat Hossen Shafat", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Hanging_Bridge,_Kaptai_Lake.jpg"),
  "shuvolong-waterfall": p("shuvolong-waterfall.jpg", "Shuvolong waterfall falling over a wide rock ledge into Kaptai Lake", "Shuvolong waterfall", "Mohammad tushar", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Shuvolong_waterfalls.jpg"),
  "rajban-vihara": p("rajban-vihara.jpg", "Golden and white Buddhist temple buildings of Rajban Vihara in Rangamati", "Rajban Vihara monastery", "Rick Joseph", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Rajban_Bihara_in_Rangamati.jpg"),
  "alutila-cave": p("alutila-cave.jpg", "Sunlight streaming into the dark rocky mouth of Alutila cave", "Inside Alutila cave", "Swarup Biswas", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Cave_painting.jpg"),
  "richhang-waterfall": p("richhang-waterfall.jpg", "Richhang waterfall sliding down a smooth sloping rock face surrounded by greenery", "Richhang waterfall", "Raihan Rana", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Resung_Waterfall_in_Khagrachari.jpg"),
  "hajachora-waterfall": p("hajachora-waterfall.jpg", "Hajachora waterfall pouring down a rock wall in thick green forest", "Hajachora waterfall", "ANKAN GHOSH DASTIDER", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Hajachara_Waterfall,_Khagrachhari_(2).jpg"),
  "bisnakandi": p("bisnakandi.jpg", "Clear water at Bisnakandi with misty green hills rising behind", "Bisnakandi", "Sabbir Sohan", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Bisnakandi,_Bangladesh_-_panoramio.jpg"),
  "lalakhal": p("lalakhal.jpg", "A wooden boat on the bright turquoise water of the Sari river at Lalakhal", "Turquoise water at Lalakhal", "Fahadzyl", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lalakhal,_Sharighat,_Sylhet,_Bangladesh.jpg"),
  "shah-jalal-dargah": p("shah-jalal-dargah.jpg", "The white and blue gateway of the Shah Jalal shrine in Sylhet with visitors", "Hazrat Shah Jalal Dargah", "Kryesmin", "CC0", "https://commons.wikimedia.org/wiki/File:Entrance_gate_of_Shah_Jalal_Dargah,_Sylhet_03.jpg"),
  "sada-pathor": p("sada-pathor.jpg", "Green hills under a cloudy sky above the stony riverbed at Bholaganj Sada Pathor", "Sada Pathor, Bholaganj", "Firuz Ahmmed", "CC0", "https://commons.wikimedia.org/wiki/File:Sada_Pathor,_Bholaganj,_Companyganj,_Sylhet_20250907_3.jpg"),
  "madhabkunda": p("madhabkunda.jpg", "Madhabkunda waterfall dropping from a cliff into a pool surrounded by forest", "Madhabkunda waterfall", "Saifulissohel", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Front_view_of_Madhabkunda_waterfall_on_13_August_2022.jpg"),
  "baikka-beel": p("baikka-beel.jpg", "Two white egrets flying low over the wetland at Baikka Beel", "Egrets at Baikka Beel", "Tanviralinbd", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Great_egret_2026.jpg"),
  "tanguar-haor": p("tanguar-haor.jpg", "Red sun setting over the flooded Tanguar Haor with a lone tree on the water", "Sunset over Tanguar Haor", "Abdul Momin", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Tanguar_Haor_2.jpg"),
  "niladri-lake": p("niladri-lake.jpg", "A calm blue lake between green grassy hills at Niladri Lake", "Niladri Lake", "Abu Hasan Mehedi", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Niladri_Lake_(139046231).jpg"),
  "star-mosque": p("star-mosque.jpg", "The white domes and star-tiled arches of the Star Mosque in Old Dhaka", "Star Mosque (Tara Masjid)", "Subarashitours", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Star_Mosque,_Dhaka,_Bangladesh.jpg"),
  "sadarghat": p("sadarghat.jpg", "Colourful wooden rowing boats crowding the Buriganga river at Sadarghat", "Boats at Sadarghat", "Kritzolina", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Buriganga_at_the_port_Sadarghat_02.jpg"),
  "national-parliament": p("national-parliament.jpg", "The geometric concrete National Parliament House of Bangladesh seen across its lawn", "National Parliament House", "Subarashitours", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Jatiya_Sangsad_Bhaban,_Dhaka,_Bangladesh.jpg"),
  "dhakeshwari-temple": p("dhakeshwari-temple.jpg", "Three red-and-white striped temple towers at Dhakeshwari National Temple", "Dhakeshwari Temple", "Ragib Hasan", "CC BY 2.5", "https://commons.wikimedia.org/wiki/File:Shiva_temples_Dhakeshwari_Mandir_2_by_Ragib_Hasan.jpg"),
  "armenian-church": p("armenian-church.jpg", "The old Armenian Church building with its bell tower in Armanitola, Dhaka", "Armenian Church, Armanitola", "No machine-readable author provided. Mak assumed (based on copyright claims).", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Armenian_Church_in_Old_Dhaka.JPG"),
  "panam-nagar": p("panam-nagar.jpg", "A crumbling old brick mansion with arched windows in Panam Nagar", "Old mansion in Panam Nagar", "Dolon Prova", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Panam_Nagar_(7).jpg"),
  "khan-jahan-ali-mazar": p("khan-jahan-ali-mazar.jpg", "The white-domed tomb of Khan Jahan Ali on green lawns in Bagerhat", "Tomb of Khan Jahan Ali", "Md.Mijanur Rahman1985", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Khan_jahan_ali_mazar_building.jpg"),
  "kusumba-mosque": p("kusumba-mosque.jpg", "The grey stone Kusumba Mosque with low domes beside a large tree", "Kusumba Mosque", "Asm sultan", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kusumba_Mosque,_Naogaon.jpg"),
  "mahasthangarh": p("mahasthangarh.jpg", "Grass-covered brick ruins and earthen walls of ancient Mahasthangarh", "Ruins of Mahasthangarh", "Picture taken by P.K.Niyogi, people removed by GreenComputer", "CC0", "https://commons.wikimedia.org/wiki/File:BD_Mahasthangarh1_without_people.jpg"),
  "kuakata": p("kuakata.jpg", "Fishing boats on Kuakata beach with the sun low in a misty sky", "Sunrise at Kuakata", "Lonely Explorer", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Sunrise_at_Kuakata_beach,_Bangladesh.jpg"),
  "kantajew-temple": p("kantajew-temple.jpg", "Close view of the terracotta-covered arches of Kantajew Temple", "Kantajew Temple terracotta", "Rahul_Kumar_Sanjowal", "CC0", "https://commons.wikimedia.org/wiki/File:Kantajew_Temple,_Dinajpur.jpeg"),
  "karamjal": p("karamjal.jpg", "Spotted deer grazing at the Karamjal wildlife centre on the edge of the Sundarbans", "Spotted deer at Karamjal", "Shahid BDWiki", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Karamjal_Point_SUNDARBAN.jpg"),

  // ---- Group D (more districts) ----
  "patenga-beach": p("patenga-beach.jpg", "Wide sandy Patenga beach with a stone embankment along the sea", "Patenga beach", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Side_view_of_Patenga_sea_beach_(10).jpg"),
  "foys-lake": p("foys-lake.jpg", "Calm Foy's Lake surrounded by trees and old buildings in Chattogram", "Foy's Lake", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Foy%27s_Lake_Resort_(2Q7A0409).jpg"),
  "dulahazara-safari-park": p("dulahazara-safari-park.jpg", "Spotted deer and tall trees beside a pond in Dulahazara Safari Park", "Dulahazara Safari Park", "Syed Sajidul Islam", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Dulahazra_Safari_Park,_Bangladesh.jpg"),
  "shah-porir-dwip": p("shah-porir-dwip.jpg", "A long jetty stretching over the water at Shah Porir Dwip, Teknaf", "Shah Porir Dwip jetty", "Masum-al-Hasan Rocky", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Shahpori_Island_01.jpg"),
  "debotakhum": p("debotakhum.jpg", "Green water between tall layered rock walls inside Debotakhum gorge", "Inside Debotakhum", "অভিজিৎ দাস", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%A6%E0%A7%87%E0%A6%AC%E0%A6%A4%E0%A6%BE%E0%A6%96%E0%A7%81%E0%A6%AE%E0%A7%87%E0%A6%B0_%E0%A6%85%E0%A6%AD%E0%A7%8D%E0%A6%AF%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A6%B0.jpg"),
  "keokradong": p("keokradong.jpg", "Green grassy slopes and distant blue hill ranges seen from Keokradong", "View from Keokradong", "Shamim2838", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Keokradong,_Ruma,_Bandarban,_Bangladesh.jpg"),
  "amiakhum-waterfall": p("amiakhum-waterfall.jpg", "Clear green pool and rocks below Amiakhum in the Thanchi hills", "Amiakhum, Thanchi", "Asikul Islam Himel", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Amiakhum_falls,_bandarban_,_Bangladesh.jpg"),
  "kaptai-national-park": p("kaptai-national-park.jpg", "A small boat on misty Kaptai Lake with forested hills behind", "Kaptai Lake and forest", "Emranhossainctg", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kaptai_National_Park_01.jpg"),
  "peda-ting-ting": p("peda-ting-ting.jpg", "The Peda Ting Ting sign and cottages on an island in Kaptai Lake", "Peda Ting Ting island", "Sabrina Naz", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Peda_ting_ting.jpg"),
  "polwel-park": p("polwel-park.jpg", "Colourful flower beds and the Polwel Park sign in Rangamati", "Polwel Park, Rangamati", "Al Riaz Uddin", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Polwel_Park.jpg"),
  "khagrachari-hanging-bridge": p("khagrachari-hanging-bridge.jpg", "People crossing a hanging bridge among palm trees in Khagrachari", "Khagrachari hanging bridge", "Masum-al-Hasan Rocky", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Hanging_bridge,_Khagrachari_01.jpg"),
  "chandranath-hill": p("chandranath-hill.jpg", "Chandranath Hill rising above green forest, with the temple on its summit", "Chandranath Hill, Sitakunda", "Jyot1.5hompad0k", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Chandranath_Hill.jpg"),
  "guliakhali-beach": p("guliakhali-beach.jpg", "Grass-covered shore and keora trees at Guliakhali sea beach", "Guliakhali sea beach", "Syed Sajidul Islam", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Guliakhali_Sea_Beach,_Sitakundu.jpg"),
  "khoiyachhora-waterfall": p("khoiyachhora-waterfall.jpg", "White water falling over dark rocks at Khoiyachhora waterfall", "Khoiyachhora waterfall", "Chilekothar Senpai", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Khoiyachhora_Step_1(30th_April,_2018).jpg"),
  "mahamaya-lake": p("mahamaya-lake.jpg", "Mahamaya Lake between low forested hills under a cloudy sky", "Mahamaya Lake, Mirsharai", "uddinnasirbd", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Mahamaya_Lake,_Mirsharai,_Chittagong.jpg"),
  "chittagong-war-cemetery": p("chittagong-war-cemetery.jpg", "White cross and rows of headstones on green lawns at Chittagong War Cemetery", "Chittagong War Cemetery", "Md. T Mahtab", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Chittagong_War_Cemetery,_Chattogram,_Bangladesh_(2).jpg"),
  "bayazid-bostami-shrine": p("bayazid-bostami-shrine.jpg", "The shrine building of Bayazid Bostami with green windows and minarets", "Shrine of Bayazid Bostami", "Owais Al Qarni", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Shrine_of_Bayazid_Bostami_13.jpg"),
  "ethnological-museum": p("ethnological-museum.jpg", "Front entrance of the Ethnological Museum in Agrabad with its Bangla and English sign", "Ethnological Museum, Chattogram", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Entrance_of_Ethnological_Museum_(03).jpg"),
  "mainamati": p("mainamati.jpg", "Excavated brick ruins of a Buddhist monastery among green lawns at Mainamati", "Mainamati ruins", "Sakib Ahmed Nasim", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Shalbon-vihara-05-by-Sakib-Ahmed-Nasim.jpg"),
  "puthia-temples": p("puthia-temples.jpg", "A tall Hindu temple with ornate spires beside a pond at Puthia", "Puthia temple complex", "Tanweer Morshed", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Shiva_temple_at_Puthia,_Rajshahi.JPG"),
  "varendra-museum": p("varendra-museum.jpg", "The arched facade of the Varendra Research Museum building in Rajshahi", "Varendra Research Museum", "Nahid.rajbd", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Varendra_Research_Museum_10.jpg"),
  "natore-rajbari": p("natore-rajbari.jpg", "The yellow colonial palace of Natore Rajbari behind a green lawn", "Natore Rajbari", "Nur-E-Saud", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Rani_Vabani_Rajbari.jpg"),
  "tajhat-palace": p("tajhat-palace.jpg", "The white Tajhat Palace with its dome and grand staircase in Rangpur", "Tajhat Palace", "Md. Rifat Hasan Jihan", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Tajhat_Rajbari_-_Side_View.jpg"),
  "lalon-mazar": p("lalon-mazar.jpg", "The white domed shrine of Lalon Shah among palm trees in Kushtia", "Lalon Shah's shrine", "Zaheed Sarwer Khan", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Shrine_of_Lalon_Shah.jpg"),
  "shilaidaha-kuthibari": p("shilaidaha-kuthibari.jpg", "Rabindranath Tagore's two-storey Kuthibari house at Shilaidaha", "Shilaidaha Kuthibari", "Armanaziz", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Tagore_Kuthibari.jpg"),
  "durga-sagar": p("durga-sagar.jpg", "Durga Sagar lake reflecting trees and a blue sky in Barishal", "Durga Sagar", "Gmmasum91", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%BE%E0%A6%B8%E0%A6%BE%E0%A6%97%E0%A6%B0.JPG"),
  "floating-guava-market": p("floating-guava-market.jpg", "Aerial view of rows of wooden boats loaded with green-yellow guavas on a canal", "Floating guava market", "Azimronnie", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Traditional_floating_fruits_market_02.jpg"),
  "birishiri": p("birishiri.jpg", "Turquoise water in a china-clay pit beside pink and white clay cliffs at Birishiri", "China-clay lake, Birishiri", "Md. Alamgir Hossain (Emon)", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Birishiri,_Netrokona.jpg"),
  "shashi-lodge": p("shashi-lodge.jpg", "The old Shashi Lodge palace among palm trees in Mymensingh", "Shashi Lodge", "Topu Saha", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Shashi_Lodge_Mymensingh_(167329569).jpeg"),
  "bhawal-national-park": p("bhawal-national-park.jpg", "A quiet path through green sal forest in Bhawal National Park", "Forest path, Bhawal", "Shimul Mohammad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:A_Road_of_Bhawal_Nationa_Park,_Gazipur.jpg"),
  "satchari-national-park": p("satchari-national-park.jpg", "Sun rays streaming through tall forest trees onto a road in Satchari", "Satchari forest", "Abdul Momin", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Satchari_National_Park,_Habiganj,_Sylhet.jpg"),
  "chandpur-molehead": p("chandpur-molehead.jpg", "Sunset over the wide river confluence at Chandpur", "Sunset at the river confluence", "lensnmatter", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:The_brahmaputra..._a_being_n%27_a_river..._(35255243433).jpg"),
  "tetulia-kanchenjunga": p("tetulia-kanchenjunga.jpg", "The snowy Kanchenjunga range rising behind green hills, seen from Panchagarh", "Kanchenjunga from Panchagarh", "MD sajjad hossain photography", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kanchenjunga_mountain_from_Panchagarh.jpg"),

  // ---- Reused photos ----
  "saint-martins-island": cover("saint-martins-island"),
  "nafakhum": cover("bandarban"),
  "sajek-valley": cover("sajek-valley"),
  "ratargul": cover("sylhet-jaflong-ratargul"),
  "sreemangal-tea-gardens": cover("sreemangal"),
  "ahsan-manzil": cover("old-dhaka"),
  "sundarbans": cover("sundarbans"),
  "paharpur": cover("paharpur"),
  "boga-lake": BOGA_LAKE_PHOTO,
  "inani-beach": galleryPhoto("inani-beach-boats.jpg", "Traditional curved wooden fishing boats resting on calm shallow water at Inani Beach", "Fishing boats at Inani Beach", "Syed sajidul islam", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Beauty_of_inani-beach_at_Cox%27s_bazar.jpg"),
  "nilgiri": galleryPhoto("bandarban-hills.jpg", "Endless ridges of forested hills fading into haze, seen from Nilgiri in Bandarban", "View from Nilgiri, Bandarban", "Tanvir Rahat", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Nilgiri,_Bandarban,_Bangladesh.jpg"),
  "kaptai-lake": galleryPhoto("kaptai-lake.jpg", "Turquoise water of Kaptai Lake winding between green forested hills in Rangamati", "Kaptai Lake, Rangamati", "ANKAN", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kaptai_Lake_from_Navy_Camp_picnic_spot.jpg"),
  "jaflong": galleryPhoto("jaflong-fisherman.jpg", "A fisherman casting a round net from a pile of river stones at Jaflong, with hills behind", "Casting nets at Jaflong", "Salam Khokon", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Jaflong,_Sylhet,_Bangladesh.jpg"),
  "lawachara": galleryPhoto("lawachara-mist.jpg", "Tall straight tree trunks fading into thick morning mist in Lawachara rainforest", "Morning mist in Lawachara forest", "Abdulmominbd", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lawachara_Forest.jpg"),
  "lalbagh-fort": galleryPhoto("lalbagh-fort-aerial.jpg", "Aerial view of Lalbagh Fort's green gardens and Mughal buildings surrounded by the dense rooftops of Old Dhaka", "Lalbagh Fort from above", "Pinu Rahman", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:2._%E0%A6%B2%E0%A6%BE%E0%A6%B2%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A7%87%E0%A6%B0_%E0%A6%95%E0%A7%87%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A6%BE.jpg"),
  "sixty-dome-mosque": galleryPhoto("sixty-dome-mosque.jpg", "The arched brick facade and rows of domes of the 15th-century Sixty Dome Mosque in Bagerhat", "Sixty Dome Mosque, a UNESCO site", "TanvirSdq", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Sixty_Dome_Mosque(Shat_Gombuj_Masjid),Bangladesh_1.jpg"),
};

/** Spot photos, preferring a selected Unsplash photo for slot `spot:<slug>`. */
export const SPOT_PHOTOS: Record<string, Photo> = Object.fromEntries(
  Object.entries({ ...BASE_SPOT_PHOTOS, ...PHOTOS_E, ...PHOTOS_F, ...PHOTOS_G, ...PHOTOS_H, ...PHOTOS_I, ...PHOTOS_J }).map(([slug, photo]) => [slug, withUnsplash(`spot:${slug}`, photo)]),
);

/** Photo for a spot; falls back to the matching destination cover if missing. */
export function spotPhoto(slug: string, guideSlug?: string): Photo {
  return SPOT_PHOTOS[slug] ?? (guideSlug ? getDestinationBySlug(guideSlug)?.cover : undefined) ?? HERO_PHOTO;
}
