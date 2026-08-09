'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone, X } from 'lucide-react'

type Lang = 'fr' | 'ar' | 'en'
type Book = { id: number; year: number; genre: string; img: string; title: Record<Lang, string>; note: Record<Lang, string>; description: Record<Lang, string>; tone: string }

const books: Book[] = [
  { id: 1, year: 2018, genre: 'Essai', img: '/covers/livre1.png', title: { fr: 'Les bagnards algériens de Cayenne', ar: 'سجناء الجزائر في كايين', en: 'Algerian Convicts of Cayenne' }, note: { fr: 'Près de 20 000 Algériens furent condamnés aux travaux forcés en Guyane.', ar: 'حُكم على ما يقارب 20 ألف جزائري بالأشغال الشاقة في غيانا.', en: 'Nearly 20,000 Algerians were sentenced to forced labor in French Guiana.' }, description: { fr: 'Une première dans l'histoire : le destin des Algériens et Algériennes condamnés au bagne de Guyane entre 1852 et 1938.', ar: 'مصير الجزائريين والجزائريات المحكوم عليهم بالأشغال الشاقة في غيانا بين 1852 و1938.', en: 'The fate of Algerian men and women sentenced to the penal colony of French Guiana between 1852 and 1938.' }, tone: 'navy' },
  { id: 2, year: 2019, genre: 'Essai', img: '/covers/livre2.jpg', title: { fr: 'Les Algériens en Nouvelle-Calédonie', ar: 'الجزائريون في كاليدونيا الجديدة', en: 'Algerians in New Caledonia' }, note: { fr: 'L'insurrection de 1871 et les destins de 2 000 Algériens.', ar: 'انتفاضة 1871 ومصير ألفي جزائري.', en: 'The 1871 uprising and the fate of 2,000 Algerians.' }, description: { fr: 'Le destin de 2 000 Algériens entre 1864 et 1897, entre déportation politique et travaux forcés.', ar: 'مصير ألفي جزائري بين عامي 1864 و1897، بين النفي السياسي والأشغال الشاقة.', en: 'The fate of 2,000 Algerians between 1864 and 1897, between political deportation and forced labor.' }, tone: 'wine' },
  { id: 3, year: 2020, genre: 'Essai', img: '/covers/livre3.jpg', title: { fr: 'Des révoltes populaires aux déportations', ar: 'من الثورات الشعبية إلى النفي', en: 'From Popular Revolts to Deportations' }, note: { fr: 'Les deux juridictions qui ont façonné une histoire de l'injustice.', ar: 'سلطتان قضائيتان شكّلتا تاريخاً من الظلم.', en: 'The two legal systems that shaped a history of injustice.' }, description: { fr: 'Une étude du code de l'indigénat et du code pénal français, et de leurs conséquences.', ar: 'دراسة لقانون الأهالي والقانون الجنائي الفرنسي ونتائجهما.', en: 'A study of the Indigenous Code, the French Penal Code, and their consequences.' }, tone: 'olive' },
  { id: 4, year: 2021, genre: 'Essai', img: '/covers/livre4.png', title: { fr: 'Prisons et camps de concentration', ar: 'سجون ومعسكرات الاعتقال', en: 'Prisons and Concentration Camps' }, note: { fr: 'La guerre d'Algérie, 1955–1962.', ar: 'حرب الجزائر، 1955–1962.', en: 'The Algerian War, 1955–1962.' }, description: { fr: 'Le système de détention durant la guerre d'indépendance, en Algérie comme en France.', ar: 'نظام الاعتقال خلال حرب الاستقلال، في الجزائر وفرنسا.', en: 'The detention system during the war of independence, in Algeria and France.' }, tone: 'navy' },
  { id: 5, year: 2024, genre: 'Essai', img: '/covers/livre5.jpg', title: { fr: 'Les convoyeurs algériens à Madagascar', ar: 'الناقلون الجزائريون في مدغشقر', en: 'Algerian Convoyers in Madagascar' }, note: { fr: 'La campagne militaire française de 1895.', ar: 'الحملة العسكرية الفرنسية عام 1895.', en: 'The French military campaign of 1895.' }, description: { fr: 'Une plongée dans le rôle méconnu des Algériens engagés à Madagascar.', ar: 'دور الجزائريين غير المعروف في حملة مدغشقر.', en: 'A look into the often-overlooked role of Algerians in Madagascar.' }, tone: 'ochre' },
  { id: 6, year: 2023, genre: 'Roman', img: '/covers/livre6.jpg', title: { fr: 'L'Évadé de Cayenne', ar: 'هارب كايين', en: 'The Escaped Convict of Cayenne' }, note: { fr: 'Une histoire de courage et de survie.', ar: 'قصة شجاعة وبقاء.', en: 'A story of courage and survival.' }, description: { fr: 'La fuite audacieuse d'un bagnard algérien depuis les enfers de Cayenne.', ar: 'الهروب الجريء لسجين جزائري من جحيم كايين.', en: 'The daring escape of an Algerian convict from the hell of Cayenne.' }, tone: 'wine' },
  { id: 7, year: 2025, genre: 'Roman', img: '/covers/livre7.jpg', title: { fr: 'L'Exilé au bout du monde', ar: 'المنفي في أقصى العالم', en: 'The Exile at the End of the World' }, note: { fr: 'Exil, résistance et quête d'identité.', ar: 'المنفى والمقاومة والبحث عن الهوية.', en: 'Exile, resistance, and the search for identity.' }, description: { fr: 'Un roman sur le déracinement d'un Algérien aux confins du monde colonial.', ar: 'رواية عن اقتلاع جزائري في أقصى العالم الاستعماري.', en: 'A novel about an Algerian uprooted at the edge of the colonial world.' }, tone: 'olive' },
  { id: 8, year: 2026, genre: 'Roman', img: '/covers/livre8.png', title: { fr: 'De Cayenne à Makouda', ar: 'من كايين إلى ماكودة', en: 'From Cayenne to Makouda' }, note: { fr: 'La mémoire et l'identité entre père et fils.', ar: 'الذاكرة والهوية بين الأب والابن.', en: 'Memory and identity between father and son.' }, description: { fr: 'Le retour d'un ancien bagnard en Kabylie et la transmission d'une mémoire longtemps oubliée.', ar: 'عودة سجين سابق إلى منطقة القبائل ونقل ذاكرة منسية طويلاً.', en: 'The return of an ex-convict to Kabylia and the transmission of a long-forgotten memory.' }, tone: 'navy' },
]

const copy = {
  fr: { eyebrow: 'Un héritage de mémoire', title: 'La plume qui a rendu une voix à l'Histoire.', intro: 'Hadj Ali Mustapha — écrivain, historien et passeur de mémoire pour toute l'Algérie.', works: 'Les œuvres', worksIntro: 'Huit livres. Des milliers de destins retrouvés à travers l'histoire algérienne.', about: 'Un homme, une œuvre, une mémoire', bio: 'Né le 15 octobre 1961 à Aït Bouaddou, Hadj Ali Mustapha est un écrivain et historien algérien spécialiste de la déportation des Algériens sous la colonisation française. Ses travaux, publiés aux Éditions El Amel à Tizi-Ouzou, explorent les trajectoires oubliées des Algériens dans les bagnes de Guyane, en Nouvelle-Calédonie et à Madagascar.', bio2: 'Auteur de huit essais et romans historiques, il a reçu en 2025 le prix Artissimo de la Nouvelle (5/283) pour son œuvre romanesque. Il vit et travaille à Dra el Mizan, où il poursuit ses recherches sur les mémoires coloniales et la résistance culturelle.', contact: 'Écrire à l'auteur', order: 'Commander ce livre', close: 'Fermer', award: 'Finaliste — Prix Artissimo de la Nouvelle 2025', footer: 'Avec fierté et gratitude.' },
  ar: { eyebrow: 'إرث من الذاكرة', title: 'قلم أعاد للتاريخ صوته.', intro: 'حاج علي مصطفى — كاتب ومؤرخ وناقل لذاكرة الجزائر بأكملها.', works: 'المؤلفات', worksIntro: 'ثمانية كتب. وآلاف المصائر التي عادت إلى النور عبر التاريخ الجزائري.', about: 'رجل، عمل، وذاكرة', bio: 'ولد حاج علي مصطفى في 15 أكتوبر 1961 بآيت بوعدو، وهو كاتب ومؤرخ جزائري متخصص في ترحيل الجزائريين خلال الاستعمار الفرنسي. تستكشف أعماله، المنشورة لدى دار الأمل في تيزي وزو، المسارات المنسية للجزائريين في سجون غيانا وكاليدونيا الجديدة ومدغشقر.', bio2: 'مؤلف لثمانية أعمال تاريخية بين المقالات والروايات، حصل عام 2025 على جائزة أرتيسيمو دي لا نوفيل (5/283). يعيش ويعمل في درعة الميزان، حيث يواصل أبحاثه حول الذاكرة الاستعمارية والمقاومة الثقافية.', contact: 'مراسلة الكاتب', order: 'طلب هذا الكتاب', close: 'إغلاق', award: 'المرشح النهائي — جائزة أرتيسيمو دي لا نوفيل 2025', footer: 'بكل فخر وامتنان.' },
  en: { eyebrow: 'A legacy of memory', title: 'The pen that gave history a voice.', intro: 'Hadj Ali Mustapha — writer, historian, and keeper of Algeria's shared memory.', works: 'The works', worksIntro: 'Eight books. Thousands of lives brought back into view across Algerian history.', about: 'One man, one body of work, one memory', bio: 'Born on 15 October 1961 in Aït Bouaddou, Hadj Ali Mustapha is an Algerian writer and historian specializing in the deportation of Algerians under French colonization. Published by El Amel Editions in Tizi-Ouzou, his work explores forgotten Algerian lives in the penal colonies of French Guiana, New Caledonia, and Madagascar.', bio2: 'Author of eight historical essays and novels, he was among the five finalists for the 2025 Artissimo de la Nouvelle Prize (out of 283 participants). He lives and works in Dra el Mizan, continuing his research into colonial memory and cultural resistance.', contact: 'Write to the author', order: 'Order this book', close: 'Close', award: 'Finalist — Artissimo de la Nouvelle Prize 2025', footer: 'With pride and gratitude.' },
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('fr')
  const [selected, setSelected] = useState<Book | null>(null)
  const [orderOpen, setOrderOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const t = copy[lang]
  const direction = lang === 'ar' ? 'rtl' : 'ltr'
  const labels = useMemo(() => ({ essay: lang === 'fr' ? 'Essai' : lang === 'ar' ? 'مقالة' : 'Essay', novel: lang === 'fr' ? 'Roman' : lang === 'ar' ? 'رواية' : 'Novel' }), [lang])
  const coverClass = (tone: string) => ({ navy: 'bg-navy', wine: 'bg-wine', olive: 'bg-olive', ochre: 'bg-ochre' })[tone] || 'bg-navy'

  return (
    <main dir={direction} className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-border py-6">
          <a href="#top" className="font-serif text-lg font-semibold tracking-tight text-primary">HAM<span className="text-accent">.</span></a>
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:flex">
            <a href="#works" className="transition-colors hover:text-accent">{t.works}</a>
            <a href="#about" className="transition-colors hover:text-accent">{t.about}</a>
            <a href="mailto:hadjmustapha755@yahoo.fr" className="transition-colors hover:text-accent">{t.contact}</a>
          </nav>
          <div className="flex items-center gap-1 rounded-full border border-border p-1">
            {(['fr', 'ar', 'en'] as Lang[]).map((item) => <button key={item} onClick={() => setLang(item)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors ${lang === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary'}`}>{item}</button>)}
          </div>
        </header>

        <section id="top" className="relative grid min-h-[620px] items-center gap-12 overflow-hidden border-b border-border py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.32em] text-accent">{t.eyebrow}</p>
            <h1 className="max-w-3xl font-serif text-6xl font-medium leading-[0.95] tracking-[-0.04em] text-primary sm:text-7xl lg:text-[100px]">{t.title}</h1>
            <div className="mt-10 flex max-w-xl items-start gap-5 border-s-2 border-accent ps-5">
              <p className="font-serif text-xl italic leading-relaxed text-muted-foreground">{t.intro}</p>
            </div>
            <a href="#works" className="mt-12 inline-flex items-center gap-3 border-b border-primary pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:border-accent hover:text-accent">{t.works}<ArrowUpRight className="size-4" /></a>
          </div>
          <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute h-[320px] w-[260px] rotate-[-7deg] border border-accent/40 bg-primary shadow-2xl sm:h-[400px] sm:w-[320px]" />
            <div className="relative flex h-[320px] w-[260px] rotate-[5deg] flex-col justify-between border border-accent/60 bg-primary p-8 text-primary-foreground shadow-2xl sm:h-[400px] sm:w-[320px] sm:p-10">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-accent"><span>Archives</span><span>1961—</span></div>
              <div><div className="mb-5 h-px w-12 bg-accent" /><p className="font-serif text-4xl leading-none sm:text-5xl">Hadj Ali<br /><span className="text-accent">Mustapha</span></p><p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-primary-foreground/60">Écrivain en histoire</p></div>
              <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.18em] text-primary-foreground/50"><span>Aït Bouaddou</span><span>01</span></div>
            </div>
          </div>
        </section>

        <section id="works" className="py-24 lg:py-32">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">01 / Bibliographie</p><h2 className="font-serif text-5xl font-medium tracking-tight text-primary sm:text-6xl">{t.works}</h2></div><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.worksIntro}</p></div>
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book, index) => (
              <button key={book.id} onClick={() => setSelected(book)} className="group text-start">
                <div className="relative aspect-[3/4] overflow-hidden border border-primary/10 shadow-sm transition-transform duration-300 group-hover:-translate-y-2">
                  <img
                    src={book.img}
                    alt={book.title[lang]}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.style.display = 'none'
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div className={`absolute inset-0 hidden flex-col justify-between ${coverClass(book.tone)} p-6 sm:p-8`}>
                    <div className="flex h-full flex-col justify-between border border-accent/50 p-4 text-primary-foreground/90 sm:p-5">
                      <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]"><span>{book.genre === 'Roman' ? labels.novel : labels.essay}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                      <p className="font-serif text-2xl leading-[0.95] sm:text-3xl">{book.title[lang]}</p>
                      <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] text-primary-foreground/60"><span>El Amel</span><span>{book.year}</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3 pt-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{book.genre} · {book.year}</p><h3 className="mt-2 font-serif text-xl leading-tight text-primary transition-colors group-hover:text-accent">{book.title[lang]}</h3></div><ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" /></div>
              </button>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-12 border-t border-border py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:py-32">
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">02 / Portrait</p><h2 className="max-w-sm font-serif text-5xl font-medium leading-none tracking-tight text-primary sm:text-6xl">{t.about}</h2><div className="mt-10 inline-flex items-center gap-3 border border-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary"><span className="size-2 rounded-full bg-accent" />{t.award}</div></div>
          <div className="max-w-2xl space-y-7 text-lg leading-relaxed text-muted-foreground"><p>{t.bio}</p><p>{t.bio2}</p><div className="grid gap-5 border-t border-border pt-8 text-sm sm:grid-cols-2"><div className="flex gap-3"><MapPin className="size-4 shrink-0 text-accent" /><span>Route d&apos;Alger<br />15 005 Dra el Mizan</span></div><div className="flex gap-3"><Mail className="size-4 shrink-0 text-accent" /><a className="break-all hover:text-accent" href="mailto:hadjmustapha755@yahoo.fr">hadjmustapha755@yahoo.fr</a></div></div></div>
        </section>

        <footer className="flex flex-col justify-between gap-5 border-t border-border py-8 text-xs text-muted-foreground sm:flex-row sm:items-center"><div><p className="font-serif text-lg font-semibold text-primary">Hadj Ali Mustapha<span className="text-accent">.</span></p><p className="mt-1">{t.footer}</p></div><div className="flex items-center gap-5"><a href="tel:+213771526996" className="flex items-center gap-2 hover:text-accent"><Phone className="size-3" />07 71 52 69 96</a><a href="mailto:hadjmustapha755@yahoo.fr" className="hidden hover:text-accent sm:block">{t.contact}</a></div></footer>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-background p-7 shadow-2xl sm:p-10">
            <button aria-label={t.close} onClick={() => setSelected(null)} className="absolute end-5 top-5 text-muted-foreground hover:text-accent"><X className="size-5" /></button>
            <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden border border-accent/50">
                <img
                  src={selected.img}
                  alt={selected.title[lang]}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div className={`absolute inset-0 hidden flex-col justify-end ${coverClass(selected.tone)} p-5`}>
                  <div className="w-full border border-accent/50 p-4 text-primary-foreground">
                    <p className="font-serif text-xl leading-none">{selected.title[lang]}</p>
                    <p className="mt-3 text-[9px] uppercase tracking-widest">{selected.year} · El Amel</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{selected.genre} · {selected.year}</p>
                <h2 className="mt-3 max-w-lg font-serif text-4xl leading-tight text-primary">{selected.title[lang]}</h2>
                <p className="mt-6 border-s-2 border-accent ps-4 font-serif text-xl italic leading-relaxed text-muted-foreground">{selected.note[lang]}</p>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{selected.description[lang]}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => { setOrderOpen(true); setSubmitted(false) }} className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent">{t.order}<ArrowUpRight className="size-4" /></button>
                  <a href={`https://wa.me/213771526996?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${selected.title[lang]}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:border-accent hover:text-accent">WhatsApp<ArrowUpRight className="size-4" /></a>
                </div>
                {orderOpen && (
                  <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} className="mt-8 grid gap-4 border-t border-border pt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t.order}</p>
                    <label className="grid gap-2 text-sm text-muted-foreground">Nom complet<input required name="name" className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm text-muted-foreground">Téléphone<input required name="phone" type="tel" className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm text-muted-foreground">Wilaya / ville<input required name="city" className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm text-muted-foreground">Adresse de livraison<textarea required name="address" rows={2} className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-accent" /></label>
                    <label className="grid gap-2 text-sm text-muted-foreground">Quantité<select name="quantity" className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-accent"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></label>
                    <button type="submit" className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent">Envoyer la demande</button>
                    {submitted && <p className="border border-accent/50 bg-accent/10 p-4 text-sm text-primary">Votre demande a bien été préparée. Nous vous contacterons pour confirmer la commande et la livraison.</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
