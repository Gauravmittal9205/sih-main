import React from 'react';

const Faqs: React.FC = () => {
  const faqsEn = [
    { q: 'Q1. How do diseases usually enter a farm?', a: '👉 Mainly through visitors, newly introduced animals, contaminated feed or water, dirty equipment, and wild birds/rodents.' },
    { q: 'Q2. What is the first step in preventing diseases?', a: '👉 Implementing Biosecurity – fencing the farm, footbaths at entry points, disinfecting vehicles/equipment, and controlling visitor access.' },
    { q: 'Q3. What should be done before introducing new animals to the farm?', a: '👉 Keep them in quarantine for at least 14 days to observe for signs of disease.' },
    { q: 'Q4. Which vaccinations are most important?', a: '👉 Poultry: Newcastle Disease, Gumboro, Fowl Pox.\n👉 Pigs: Classical Swine Fever, Foot & Mouth Disease, Deworming for parasites.' },
  ];
  const faqsHi = [
    { q: 'Q1. फार्म में रोग सबसे ज़्यादा कैसे फैलते हैं?', a: '👉 मुख्य रूप से बाहरी आगंतुक, संक्रमित जानवर, चारा-पानी का संक्रमण, गंदे उपकरण और जंगली पक्षी/चूहे से।' },
    { q: 'Q2. रोग की रोकथाम के लिए सबसे पहला कदम क्या है?', a: '👉 जैव-सुरक्षा (Biosecurity) लागू करना – जैसे फार्म के चारों ओर बाड़, प्रवेश पर फुटबाथ, वाहनों का कीटाणुशोधन, और आगंतुकों पर नियंत्रण।' },
    { q: 'Q3. नए जानवर को फार्म में लाने से पहले क्या करना चाहिए?', a: '👉 कम से कम 14 दिन क्वारंटीन (अलग रखना) ताकि यह देखा जा सके कि उनमें कोई रोग तो नहीं है।' },
    { q: 'Q4. कौन-कौन से टीके (Vaccines) ज़रूरी होते हैं?', a: '👉 पोल्ट्री में: न्यूकैसल (रानीखेत), गंबोरो, फाउल पॉक्स।\n👉 सूअरों में: क्लासिकल स्वाइन फीवर, FMD, पैरासाइट कंट्रोल (डीवॉर्मिंग)।' },
  ];
  const extraEn = [
    {
      q: 'Q5. What should be done if several animals suddenly fall sick?',
      a: ['Immediately isolate the sick animals.', 'Call a veterinarian.', 'Inform local animal health authorities.', 'Disinfect the affected area.'],
      list: true,
    },
    { q: 'Q6. How should dead animals be disposed of?', a: '👉 By deep burial with lime or incineration. Never throw carcasses in the open, as it spreads infection.' },
    { q: 'Q7. Why is record keeping important?', a: '👉 It helps trace the source of outbreaks, ensures eligibility for insurance/compensation, and strengthens future prevention measures.' },
    { q: 'Q8. What is the top priority during an emergency?', a: '👉 Human and animal safety first, followed by controlling the disease/event and informing the authorities.' },
  ];
  const extraHi = [
    {
      q: 'Q5. यदि अचानक कई जानवर बीमार पड़ जाएँ तो क्या करना चाहिए?',
      a: ['तुरंत बीमार जानवरों को अलग करें।', 'पशु चिकित्सक को बुलाएँ।', 'स्थानीय पशु स्वास्थ्य विभाग को सूचना दें।', 'प्रभावित क्षेत्र को डिसइंफेक्ट करें।'],
      list: true,
    },
    { q: 'Q6. मरे हुए जानवर का निपटान कैसे करें?', a: '👉 दफन (गड्ढे में चूना डालकर) या दहन (Incineration) करें। खुले में फेंकने से रोग और ज्यादा फैल सकता है।' },
    { q: 'Q7. रिकॉर्ड रखना क्यों ज़रूरी है?', a: '👉 ताकि बीमारी का स्रोत पता चल सके, बीमा/सरकारी मुआवज़ा मिल सके और भविष्य में रोकथाम आसान हो।' },
    { q: 'Q8. आपातकालीन स्थिति (Emergency) में प्राथमिकता क्या होगी?', a: '👉 सबसे पहले लोगों और जानवरों की सुरक्षा, फिर रोग/घटना को नियंत्रित करना और उचित अधिकारियों को सूचना देना।' },
  ];
  const [lang, setLang] = React.useState<'en' | 'hi'>('en');
  const base = lang === 'en' ? faqsEn : faqsHi;
  const extra = lang === 'en' ? extraEn : extraHi;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">FAQs</h1>
          <div className="space-x-2 text-sm">
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-lg border ${lang==='en'?'bg-teal-600 text-white border-teal-600':'border-gray-300 text-gray-700'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-3 py-1 rounded-lg border ${lang==='hi'?'bg-teal-600 text-white border-teal-600':'border-gray-300 text-gray-700'}`}>हिंदी</button>
          </div>
        </div>
        <div className="space-y-3">
          {base.map((f, i) => (
            <details key={i} className="bg-gray-50 rounded-lg p-4">
              <summary className="cursor-pointer list-none font-medium text-gray-800">{f.q}</summary>
              <p className="mt-2 whitespace-pre-line text-gray-700 text-sm">{f.a}</p>
            </details>
          ))}
          {extra.map((f, i) => (
            <details key={`x-${i}`} className="bg-gray-50 rounded-lg p-4">
              <summary className="cursor-pointer list-none font-medium text-gray-800">{f.q}</summary>
              {'list' in f ? (
                <ul className="mt-2 text-gray-700 text-sm list-disc pl-5 space-y-1">
                  {(f as any).a.map((it: string, idx: number) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 whitespace-pre-line text-gray-700 text-sm">{(f as any).a}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;


