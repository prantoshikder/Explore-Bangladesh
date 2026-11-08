/** Photos for group-j.ts spots (Wikimedia Commons; credited in /gallery). Files in /public/images/spots/. */
import type { Photo } from "@/types/destination";
import { p } from "./photo-helpers";

export const PHOTOS_J: Record<string, Photo> = {
  // Barishal
  "guthia-mosque": p("guthia-mosque.jpg", "Aerial view of the white-domed Guthia mosque complex with its tall minaret, gardens and pond", "Guthia Mosque", "Azim Khan Ronnie", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Baitul_Aman_Mosque_02.jpg"),
  "oxford-mission-church": p("oxford-mission-church.jpg", "Red-brick Oxford Mission Church with a grey dome behind a green lawn and palm trees", "Oxford Mission Church", "JoachimBadhonBoiragee", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%9A%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%9A%E0%A7%87%E0%A6%B0_%E0%A6%9B%E0%A6%AC%E0%A6%BF.jpg"),
  "bibir-pukur": p("bibir-pukur.jpg", "The walled rectangular pond of Bibir Pukur with city buildings along its far side", "Bibir Pukur", "Kowshik", "CC BY 2.5", "https://commons.wikimedia.org/wiki/File:Bibir_Pukur_Barisal.jpg"),
  "barishal-launch-terminal": p("barishal-launch-terminal.jpg", "Aerial view of large multi-deck launches moored at Barishal's river terminal beside the city", "Barishal launch terminal", "NiamulMulk", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Barisal_Launch_Terninal.jpg"),
  "satla-shapla-bil": p("satla-shapla-bil.jpg", "A sea of pink-red water lilies blooming among floating leaves across the Satla wetland at dawn", "Water lilies at Satla, Wazirpur", "Badal Chandra Sarker", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Waterlily_satla_barisal.jpg"),
  // Patuakhali
  "kuakata-buddhist-temple": p("kuakata-buddhist-temple.jpg", "Front of the Buddhist temple in Kuakata with guardian statues by the steps", "Kuakata Buddhist temple", "Tuhin", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%95%E0%A7%81%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%95%E0%A6%BE%E0%A6%9F%E0%A6%BE_%E0%A6%AC%E0%A7%8C%E0%A6%A6%E0%A7%8D%E0%A6%A7_%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%B0%E0%A7%87%E0%A6%B0_%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AE%E0%A7%81%E0%A6%96%E0%A6%AD%E0%A6%BE%E0%A6%97.jpg"),
  // Jhalokathi
  "kirtipasha-zamindar-bari": p("kirtipasha-zamindar-bari.jpg", "Moss-covered brick arches of the ruined Kirtipasha zamindar palace among trees", "Kirtipasha Zamindar Bari", "Lonely Explorer", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kirtipasha_Zamindar_Bari_Ruins_(2).jpg"),
  // Pirojpur
  "atghar-kuriana-floating-market": p("atghar-kuriana-floating-market.jpg", "Farmers in small wooden boats loaded with guavas crowding a canal at Kuriana", "Kuriana floating market", "Kazi Asadullah Al Emran", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Floating_markets_in_Barisal.jpg"),
  "kuriana-boat-market": p("kuriana-boat-market.jpg", "Aerial view of rows of new wooden boats lined up on the riverbank at the Kuriana boat market", "Kuriana boat market", "Muhammad Amdad Hossain", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Riverside_Boat_Market.jpg"),
  "rayerkathi-zamindar-bari": p("rayerkathi-zamindar-bari.jpg", "Ruined brick arches of the old Rayerkathi zamindar house under a blue sky", "Rayerkathi Zamindar Bari", "Radman Siddiki", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Rayerkathi_Jomidar_Bari_03.jpg"),
  // Bhola
  "char-kukri-mukri": p("char-kukri-mukri.jpg", "A calm green creek winding between mangrove trees at Char Kukri Mukri", "Char Kukri Mukri", "Munmun.13", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Chor.Kukri-Mukri.2.jpg"),
  // Barguna
  "tengragiri-wildlife-sanctuary": p("tengragiri-wildlife-sanctuary.jpg", "Exposed mangrove roots on muddy ground at the edge of Tengragiri forest", "Tengragiri mangrove forest", "Mohammad samiun islam", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:20190612_161146_%E0%A6%9F%E0%A7%87%E0%A6%82%E0%A6%B0%E0%A6%BE%E0%A6%97%E0%A6%BF%E0%A6%B0%E0%A6%BF_%E0%A6%AC%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%A3%E0%A7%80_%E0%A6%85%E0%A6%AD%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B0%E0%A6%A3%E0%A7%8D%E0%A6%AF%E0%A5%A4.jpg"),
  // Patuakhali
  "payra-bridge": p("payra-bridge.jpg", "Aerial evening view of the lit-up Payra Bridge stretching across the wide river", "Payra Bridge at Lebukhali", "Abdur Rahman Saikat", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Payra_Bridge_Patuakhali.jpg"),
  // Jhalokathi
  "khanbari-mosque-complex": p("khanbari-mosque-complex.jpg", "Three weathered white single-domed mosques with ornate plaster panels standing side by side", "Khanbari Old Jame Mosque Complex, Rajapur", "Dr. Emdadul Hoque Mamun", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Khanbari_Old_Jami_Mosque,_Jhalakathi.jpg"),
  "saturia-zamindar-bari": p("saturia-zamindar-bari.jpg", "Roofless red-brick ruins of Saturia Zamindar Bari surrounded by trees and plants", "Saturia Zamindar Bari, Rajapur", "Dr. Emdadul Hoque Mamun", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Saturia_Zamindar_Bari,_Jhalokathi_(65).jpg"),
  // Bhola
  "nizam-hasina-mosque": p("nizam-hasina-mosque.jpg", "Entrance of the Nizam-Hasina Foundation Mosque under a pyramid-shaped stone frame with a patterned dome above", "Nizam-Hasina Foundation Mosque, Bhola", "Md Arif bd", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Nizam_hasina_foundation_mosqe.jpg"),
  "jakob-tower": p("jakob-tower.jpg", "Tall curved white Jakob Tower with a glass dome on top against a pink evening sky", "Jakob Tower, Char Fasson", "Syfullah Nabil", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Jakob_Watch_Tower.jpg"),
  "meghna-shahbazpur-tulatuli": p("meghna-shahbazpur-tulatuli.jpg", "A white tourist boat anchored on the calm, misty Meghna beside a grassy bank at Tulatuli", "Meghna at Tulatuli, Bhola", "Nurunnaby Chowdhury (Hasive)", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Shahbazpur_Meghna_Tourist_Spot,_Tulatuli,_Bhola_(14).jpg"),
  // Barguna
  "bibi-chini-mosque": p("bibi-chini-mosque.jpg", "Square red-brick Bibi Chini Mosque with a single dome on a grassy mound", "Bibi Chini Shahi Mosque, Betagi", "Farhan Al Mostakim", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%AC%E0%A6%BF%E0%A6%AC%E0%A6%BF_%E0%A6%9A%E0%A6%BF%E0%A6%A8%E0%A6%BF_%E0%A6%B6%E0%A6%BE%E0%A6%B9%E0%A7%80_%E0%A6%AE%E0%A6%B8%E0%A6%9C%E0%A6%BF%E0%A6%A6.jpg"),
  // Pirojpur
  "momin-mosque": p("momin-mosque.jpg", "Carved wooden front wall of Momin Mosque with latticed panels, a carved door and wooden shutters", "Momin Mosque, Mathbaria", "Farhan Al Mostakim", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%AE%E0%A6%AE%E0%A6%BF%E0%A6%A8_%E0%A6%AE%E0%A6%B8%E0%A6%9C%E0%A6%BF%E0%A6%A6_%E0%A6%AE%E0%A6%A0%E0%A6%AC%E0%A6%BE%E0%A6%A1%E0%A6%BC%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE.jpg"),
  // Barguna
  "nidrar-char": p("nidrar-char.jpg", "Keora trees and mangrove breathing roots on green, waterlogged ground at Nidrar Char", "Nidrar Char, Taltoli", "Rifat R", "CC0", "https://commons.wikimedia.org/wiki/File:%E0%A6%A8%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B0_%E0%A6%9A%E0%A6%B0_%E0%A7%AA.webp"),
};
