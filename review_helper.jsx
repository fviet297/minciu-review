import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, MapPin, Star, Globe, RefreshCw, AlertCircle, Sparkles, Key, Loader2, X, Plus, Trash2 } from 'lucide-react';

const DEFAULT_REVIEWS = {
  vi: {
    label: 'Tiếng Việt',
    flag: '🇻🇳',
    items: [
      "Mình ở đây 2 đêm và cảm thấy rất thoải mái. Tự check-in nên mình về lúc nào cũng được, không phải chờ đợi. Phòng có điều hoà mát lạnh, WiFi mạnh. Có cả bếp nên mình tự nấu tối cho tiết kiệm. Chủ nhà dễ thương lắm, giới thiệu nhiều quán ăn ngon gần đó.",
      "Vị trí rất tiện, đi bộ ra Đại Nội chỉ khoảng 10 phút. Phòng sạch, có điều hoà, có sẵn cả máy giặt nên đi lâu ngày không lo quần áo. Chỗ để xe miễn phí trong sân nên cảm thấy an tâm khi thuê xe máy đi chơi.",
      "Thuê phòng qua Booking và ở 3 đêm. Tự check-in qua mã số khá tiện, mình tới Huế lúc gần nửa đêm cũng không làm phiền ai. Bếp trang bị đầy đủ, có nồi cơm điện, chảo, nên mình nấu bữa sáng tại nhà. Rất đáng tiền!",
      "Giá cả hợp lý, phòng rộng rãi, điều hoà làm mát nhanh dù nắng nóng của Huế. Chỗ để xe miễn phí là điểm cộng lớn vì mình đi phượt bằng xe máy. Có máy giặt nên giặt đồ rất tiện, không cần ra ngoài tiệm.",
      "Lần đầu đến Huế và chọn Minciu, không thất vọng. Chủ nhà nhắn tin hướng dẫn tự check-in rất chi tiết, dễ hiểu. Phòng gọn gàng, sạch sẽ. Bếp chung có đủ gia vị cơ bản nên mình thử nấu một bữa bún bò tại nhà, vui cực.",
      "Mình đi cùng bạn, ở 4 đêm. Phòng có điều hoà, phòng tắm nước nóng ổn, máy giặt dùng chung rất tiện. Khu vực yên tĩnh nhưng vẫn gần chợ, dễ ra mua đồ ăn. Chỗ để xe rộng, an toàn. Tôi sẽ quay lại nếu có dịp ra Huế.",
      "Homestay kiểu gia đình, cảm giác rất ấm cúng. Không cần gặp mặt cũng có thể tự check-in, phù hợp cho dân đi công tác như mình. Bếp sạch sẽ, mình tự pha cà phê buổi sáng. Phòng có điều hoà, ngủ ngon.",
      "Rất thích không gian ở đây. Phòng sạch, điều hoà tốt, có cả máy giặt cho khách dùng. Chủ nhà thân thiện, chỉ đường rất nhiệt tình. Chỗ để xe máy miễn phí nên tiết kiệm được khá nhiều. Đáng tiền đồng!",
      "Ở đây 1 tuần làm remote work. WiFi mạnh, phòng yên tĩnh có điều hoà, bàn ghế làm việc tiện. Bếp có đủ đồ nấu ăn cơ bản, máy giặt dùng thoả mái. Tự check-in linh hoạt theo lịch mình. Quá hài lòng.",
      "Giá tốt, phòng đẹp, có điều hoà. Điểm mình thích nhất là được tự nấu ăn ở bếp chung, tiết kiệm tiền. Chỗ để xe trong sân miễn phí. Chủ nhà trả lời tin nhắn nhanh, hướng dẫn tự check-in rõ ràng. Sẽ giới thiệu cho bạn bè."
    ]
  },
  en: {
    label: 'English',
    flag: '🇬🇧',
    items: [
      "Stayed here for two nights and loved it. The self check-in meant I could arrive late without hassle. Room was cool with the AC on full blast - much needed in Hue's heat. Used the kitchen to cook a simple dinner which saved me money. Host was super responsive on messages.",
      "Great location, about a 10 minute walk to the Imperial City. The room was clean, had a decent AC, and there's a shared washing machine which was a lifesaver on a long trip. Free parking inside the gate - felt safe leaving my rented scooter overnight.",
      "Booked for 3 nights. Self check-in with a code was really smooth, especially since I arrived close to midnight. The kitchen had a rice cooker, pans, the basics - enough to cook breakfast instead of eating out every meal. Good value.",
      "Fair price for what you get. Room was spacious, AC worked quickly even on the hottest afternoon. Free parking was a big plus since I was getting around by motorbike. Washing machine meant I could travel lighter.",
      "First time in Hue and Minciu was a solid pick. The host sent detailed self check-in instructions that were easy to follow. Place was tidy. Shared kitchen had basic spices so I tried making my own bun bo - fun experience.",
      "Came with a friend, stayed 4 nights. Room had AC, hot water was reliable, and the shared washing machine was handy. Quiet area but close to cafes and food stalls. Parking space is wide and secure. Would come back.",
      "Has that homey family-run feel. The self check-in is perfect for business travelers like me who don't want to deal with anyone after a long day. Clean kitchen - made my own coffee every morning. AC kept the room cool, slept well.",
      "Really enjoyed this place. Clean room, AC works fine, washing machine available for guests. Host was friendly and gave good directions to local spots. Free motorbike parking saved me money on a week-long trip. Worth every dong.",
      "Stayed a week doing remote work. Strong WiFi, quiet room with good AC, comfortable desk setup. Kitchen has enough cookware for basic meals, washing machine no problem. Flexible self check-in fit my schedule. Very happy overall.",
      "Good price, nice room, AC was great. My favorite part was being able to cook in the shared kitchen - saved a lot on food. Free parking in the courtyard. Host replied quickly and the check-in instructions were clear. Will recommend to friends."
    ]
  },
  ko: {
    label: '한국어',
    flag: '🇰🇷',
    items: [
      "2박 묵었는데 정말 편했어요. 셀프 체크인이라 늦게 도착해도 부담 없이 들어갈 수 있었어요. 에어컨도 잘 나오고 - 후에 날씨엔 필수죠. 주방에서 간단하게 요리해서 식비도 아꼈습니다. 호스트 분이 메시지 답장을 빨리 주셔서 좋았어요.",
      "위치가 좋아서 황궁까지 걸어서 10분 정도 걸려요. 방은 깨끗하고 에어컨도 잘 되고, 공용 세탁기가 있어서 긴 여행에 정말 유용했어요. 문 안쪽에 무료 주차장이 있어서 빌린 오토바이를 밤새 세워둬도 안심이었습니다.",
      "3박 예약했어요. 코드로 셀프 체크인하는 게 진짜 편하더라고요, 거의 자정에 도착했는데도 문제없었어요. 주방에 밥솥이랑 팬 같은 기본 도구가 다 있어서 매 끼니 밖에서 사 먹지 않고 아침은 직접 해 먹을 수 있었어요. 가성비 좋습니다.",
      "가격대비 괜찮아요. 방도 넓고, 한낮에도 에어컨이 금방 시원해져요. 오토바이 타고 다녀서 무료 주차가 큰 장점이었어요. 세탁기 덕분에 짐도 가볍게 다닐 수 있었습니다.",
      "후에 첫 방문이었는데 민시우 선택 잘했어요. 호스트가 셀프 체크인 안내를 자세하게 보내줘서 따라하기 쉬웠습니다. 숙소 깔끔했고요. 공용 주방에 기본 양념이 있길래 분보 후에 한번 만들어봤는데 재밌었어요.",
      "친구랑 같이 4박 묵었어요. 방에 에어컨 있고, 온수 잘 나오고, 공용 세탁기도 편했어요. 조용한 동네인데 카페랑 식당이 가까웠서 좋았습니다. 주차 공간도 넓고 안전해요. 다시 오고 싶은 곳입니다.",
      "가족이 운영하는 따뜻한 분위기가 있어요. 셀프 체크인이라서 출장 다니는 저한테는 딱이었어요 - 하루 종일 일하고 와서 누구 만나고 싶지 않을 때요. 주방 깨끗해서 매일 아침 커피 직접 내려 마셨어요. 에어컨도 시원해서 잘 잤습니다.",
      "정말 마음에 들었어요. 방 깨끗하고 에어컨 잘 되고, 세탁기도 쓸 수 있어요. 호스트 분이 친절하게 주변 맛집도 알려주셨어요. 일주일 여행에서 무료 오토바이 주차 덕분에 돈 많이 아꼈어요. 지불한 값어치 충분합니다.",
      "일주일 동안 재택근무 하면서 묵었어요. 와이파이 빠르고, 방 조용하고 에어컨 좋고, 책상도 편했어요. 주방에 간단한 요리 도구 있고 세탁기도 문제없이 썼어요. 셀프 체크인이 제 스케줄에 맞아서 편했습니다. 전반적으로 아주 만족해요.",
      "가격 좋고, 방 괜찮고, 에어컨도 훌륭했어요. 제일 좋았던 건 공용 주방에서 직접 요리할 수 있다는 점 - 식비 많이 절약했어요. 마당에 무료 주차장도 있고요. 호스트가 답장 빠르고 체크인 안내도 명확했어요. 친구들한테 추천할 거예요."
    ]
  }
};

const GOOGLE_MAPS_URL = "https://search.google.com/local/writereview?placeid=ChIJZxp0GwCnQTER-7QcG9TytJ4";

const LANG_PROMPT_MAP = {
  vi: 'tiếng Việt (giọng điệu tự nhiên, thân mật như người Việt Nam trẻ viết review, có thể dùng "mình/tớ/bạn")',
  en: 'English (natural casual tone, like a real traveler writing a Google review, use contractions)',
  ko: '한국어 (자연스러운 구어체, 실제 한국 여행자가 쓰는 리뷰 스타일, "-어요/-습니다" 혼용)'
};

export default function ReviewHelper() {
  const [activeLang, setActiveLang] = useState('vi');
  const [usedReviews, setUsedReviews] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [customReviews, setCustomReviews] = useState({ vi: [], en: [], ko: [] });
  const [pinnedReview, setPinnedReview] = useState(null);

  const [showGenerator, setShowGenerator] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordAction, setPasswordAction] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generateCount, setGenerateCount] = useState(5);
  const [generateError, setGenerateError] = useState('');
  const [generateSuccess, setGenerateSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;
    pickRandom();
  }, [loading]);

  const loadData = async () => {
    setLoading(true);
    try {
      try {
        const usedResult = await window.storage.get('used_reviews', true);
        if (usedResult && usedResult.value) {
          setUsedReviews(JSON.parse(usedResult.value));
        }
      } catch (e) {}

      try {
        const customResult = await window.storage.get('custom_reviews', true);
        if (customResult && customResult.value) {
          const custom = JSON.parse(customResult.value);
          setCustomReviews(custom);
          mergeReviews(custom);
        }
      } catch (e) {}

      try {
        const keyResult = await window.storage.get('groq_api_key', false);
        if (keyResult && keyResult.value) {
          setApiKey(keyResult.value);
        }
      } catch (e) {}

    } finally {
      setLoading(false);
    }
  };

  const mergeReviews = (custom) => {
    const merged = {};
    Object.keys(DEFAULT_REVIEWS).forEach(lang => {
      merged[lang] = {
        ...DEFAULT_REVIEWS[lang],
        items: [...DEFAULT_REVIEWS[lang].items, ...(custom[lang] || [])]
      };
    });
    setReviews(merged);
  };

  const markAsUsed = async (lang, index) => {
    const key = `${lang}_${index}`;
    const newUsed = { ...usedReviews, [key]: Date.now() };
    setUsedReviews(newUsed);
    try {
      await window.storage.set('used_reviews', JSON.stringify(newUsed), true);
    } catch (error) {
      console.error('Lỗi lưu trạng thái:', error);
    }
  };

  const handleCopy = async (text, lang, index) => {
    const tab = window.open(GOOGLE_MAPS_URL, '_blank');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(`${lang}_${index}`);
      await markAsUsed(lang, index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedIndex(`${lang}_${index}`);
        await markAsUsed(lang, index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (e) {
        if (tab) tab.close();
        alert('Không thể copy. Vui lòng copy thủ công.');
      }
      document.body.removeChild(textarea);
    }
  };

  const openPasswordModal = (action) => {
    setPasswordAction(action);
    setPasswordInput('');
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (passwordInput !== '2011') {
      setPasswordError('Mật khẩu không đúng');
      return;
    }
    setShowPasswordModal(false);
    setPasswordInput('');
    if (passwordAction === 'reset') {
      setResetting(true);
      try {
        await window.storage.delete('used_reviews', true);
        setUsedReviews({});
      } catch (error) {
        console.error('Lỗi reset:', error);
      } finally {
        setResetting(false);
      }
    } else if (passwordAction === 'deleteAI') {
      try {
        await window.storage.delete('custom_reviews', true);
        setCustomReviews({ vi: [], en: [], ko: [] });
        setReviews(DEFAULT_REVIEWS);
        setGenerateSuccess('Đã xoá toàn bộ đánh giá AI tạo');
        setTimeout(() => setGenerateSuccess(''), 3000);
      } catch (e) {
        console.error('Lỗi xoá:', e);
      }
    }
  };

  const handleReset = () => openPasswordModal('reset');

  const saveApiKey = async (key) => {
    setApiKey(key);
    try {
      if (key) {
        await window.storage.set('groq_api_key', key, false);
      } else {
        await window.storage.delete('groq_api_key', false);
      }
    } catch (e) {
      console.error('Lỗi lưu API key:', e);
    }
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setGenerateError('Vui lòng nhập Groq API key');
      return;
    }
    if (generateCount < 1 || generateCount > 20) {
      setGenerateError('Số lượng phải từ 1 đến 20');
      return;
    }

    setGenerating(true);
    setGenerateError('');
    setGenerateSuccess('');

    try {
      const samples = [...reviews[activeLang].items]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      const prompt = `Bạn là AI chuyên viết đánh giá homestay chân thật, tự nhiên như người thật.

Homestay: Minciu - 04A Nguyễn Thiện Thuật, phường Phú Xuân, TP Huế, Việt Nam.
Tiện nghi: tự check-in, phòng có điều hoà, máy giặt, bếp, chỗ để xe miễn phí, WiFi.

Dưới đây là ${samples.length} đánh giá mẫu (cách nhau bởi ---):

${samples.map((s, i) => `Mẫu ${i + 1}:\n${s}`).join('\n---\n')}

Nhiệm vụ: Viết ${generateCount} đánh giá MỚI bằng ${LANG_PROMPT_MAP[activeLang]}.

Yêu cầu:
- Giọng điệu tự nhiên, chân thật như khách du lịch thật viết trên Google Maps/Booking
- KHÔNG sao chép y nguyên câu từ mẫu, phải viết mới hoàn toàn
- Mỗi đánh giá có hoàn cảnh/trải nghiệm riêng (đi một mình, đi nhóm, công tác, phượt xe máy, remote work, gia đình...)
- Đan xen tiện nghi một cách tự nhiên, không phải đánh giá nào cũng đề cập hết tất cả
- Độ dài mỗi đánh giá: 2-4 câu
- Tất cả đều là đánh giá tích cực (4-5 sao)

Chỉ trả về JSON đúng format, KHÔNG markdown, KHÔNG giải thích:
{"reviews": ["đánh giá 1", "đánh giá 2", ...]}`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'qwen/qwen3-32b',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.9,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Lỗi API: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);

      if (!parsed.reviews || !Array.isArray(parsed.reviews)) {
        throw new Error('Phản hồi không đúng định dạng');
      }

      const newCustom = {
        ...customReviews,
        [activeLang]: [...(customReviews[activeLang] || []), ...parsed.reviews]
      };
      setCustomReviews(newCustom);
      mergeReviews(newCustom);

      await window.storage.set('custom_reviews', JSON.stringify(newCustom), true);

      setGenerateSuccess(`Đã tạo thành công ${parsed.reviews.length} đánh giá mới!`);
      setTimeout(() => setGenerateSuccess(''), 4000);

    } catch (error) {
      console.error('Generate error:', error);
      setGenerateError(error.message || 'Có lỗi xảy ra khi tạo đánh giá');
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteGenerated = () => openPasswordModal('deleteAI');

  const pickRandom = () => {
    const allAvailable = Object.keys(reviews).flatMap(lang =>
      reviews[lang].items
        .map((item, i) => ({ item, i, lang }))
        .filter(({ i }) => !usedReviews[`${lang}_${i}`])
    );
    if (allAvailable.length === 0) { setPinnedReview(null); return; }
    const picked = allAvailable[Math.floor(Math.random() * allAvailable.length)];
    setPinnedReview({ text: picked.item, index: picked.i, lang: picked.lang });
  };

  const currentReviews = reviews[activeLang].items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => (!!usedReviews[`${activeLang}_${a.i}`]) - (!!usedReviews[`${activeLang}_${b.i}`]));
  const defaultCount = DEFAULT_REVIEWS[activeLang].items.length;
  const usedCount = currentReviews.filter(({ i }) => usedReviews[`${activeLang}_${i}`]).length;
  const totalCount = currentReviews.length;
  const generatedTotal = Object.values(customReviews).reduce((sum, arr) => sum + (arr?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">

        {isAdminUnlocked && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 mb-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2.5 rounded-xl shrink-0">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  
                </h1>
                <p className="text-sm text-slate-600 mt-1">Homestay Minciu - Huế, Việt Nam</p>
              </div>
              <button
                onClick={() => setIsAdminUnlocked(false)}
                className="text-slate-400 hover:text-slate-600 p-1 shrink-0"
                title="Khoá lại"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
              <span>04A Nguyễn Thiện Thuật, Phú Xuân, TP. Huế</span>
            </div>

            <div className="flex items-center gap-3 mb-4 px-1">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Đã sử dụng</span>
                  <strong className="text-slate-700">{usedCount}/{totalCount}</strong>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                    style={{ width: `${totalCount > 0 ? (usedCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Mở Google Maps
              </a>
              <button
                onClick={() => setShowGenerator(true)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Tạo thêm bằng AI
              </button>
              <button
                onClick={handleReset}
                disabled={resetting}
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-3 rounded-xl transition-colors text-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
                Reset
              </button>
              {generatedTotal > 0 && (
                <button
                  onClick={handleDeleteGenerated}
                  className="inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-3 rounded-xl transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Xoá AI ({generatedTotal})
                </button>
              )}
            </div>
          </div>
        )}

        {!loading && pinnedReview && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                Gợi ý cho bạn &middot; {reviews[pinnedReview.lang]?.flag}
              </span>
              <button onClick={pickRandom} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
                Khác
              </button>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-4">{pinnedReview.text}</p>
            <button
              onClick={() => { handleCopy(pinnedReview.text, pinnedReview.lang, pinnedReview.index); pickRandom(); }}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                copiedIndex === `${pinnedReview.lang}_${pinnedReview.index}`
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {copiedIndex === `${pinnedReview.lang}_${pinnedReview.index}`
                ? <><Check className="w-4 h-4" />Đã copy!</>
                : <><Copy className="w-4 h-4" />Copy và viết đánh giá</>}
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-5">
          <div className="flex border-b border-slate-200">
            {Object.entries(reviews).map(([code, data]) => {
              const langUsedCount = data.items.filter((_, i) => usedReviews[`${code}_${i}`]).length;
              const isActive = activeLang === code;
              return (
                <button
                  key={code}
                  onClick={() => setActiveLang(code)}
                  className={`flex-1 px-3 py-3.5 text-sm font-medium transition-colors relative ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    <span className="text-base">{data.flag}</span>
                    <span className="hidden sm:inline">{data.label}</span>
                    <span className="text-xs text-slate-400">({langUsedCount}/{data.items.length})</span>
                  </div>
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                </button>
              );
            })}
          </div>

        </div>


        <button
          onClick={() => setShowList(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-sm font-medium text-slate-700 mb-3"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            Xem tất cả đánh giá
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            {totalCount} đánh giá
            <svg className={`w-4 h-4 transition-transform ${showList ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </span>
        </button>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
          </div>
        ) : showList ? (
          <div className="space-y-3">
            {currentReviews.map(({ item: review, i: index }, displayIndex) => {
              const key = `${activeLang}_${index}`;
              const isUsed = !!usedReviews[key];
              const isCopied = copiedIndex === key;
              const isAIGenerated = index >= defaultCount;

              return (
                <div
                  key={key}
                  className={`bg-white rounded-xl shadow-sm border transition-all ${
                    isUsed ? 'border-slate-200 opacity-70' : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-2 mb-3 flex-wrap">
                      <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isUsed ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {displayIndex + 1}
                      </div>
                      {isUsed && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
                          <Check className="w-3 h-3" />
                          Đã có người sử dụng
                        </span>
                      )}
                    </div>

                    <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
                      isUsed ? 'text-slate-500' : 'text-slate-800'
                    }`}>
                      {review}
                    </p>

                    <button
                      onClick={() => handleCopy(review, activeLang, index)}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        isCopied
                          ? 'bg-green-600 text-white'
                          : isUsed
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Đã copy!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy và viết đánh giá
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="text-center text-xs text-slate-400 mt-8 pb-4">
          {isAdminUnlocked ? (
            <button
              onClick={() => setIsAdminUnlocked(false)}
              className="mt-2 text-xs text-slate-400 hover:text-slate-600 underline"
            >
              Thoát Admin
            </button>
          ) : (
            <button
              onClick={() => { setAdminPasswordInput(''); setAdminPasswordError(''); setShowAdminModal(true); }}
              className="mt-2 text-xs text-slate-300 hover:text-slate-500 transition-colors"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {showAdminModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <h2 className="font-bold text-slate-900 mb-1">Quản lý</h2>
            <p className="text-sm text-slate-500 mb-4">Nhập mật khẩu để mở tính năng quản lý.</p>
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => { setAdminPasswordInput(e.target.value); setAdminPasswordError(''); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (adminPasswordInput === '2011') {
                    setIsAdminUnlocked(true);
                    setShowAdminModal(false);
                    setAdminPasswordInput('');
                  } else {
                    setAdminPasswordError('Mật khẩu không đúng');
                  }
                }
              }}
              placeholder="Mật khẩu"
              autoFocus
              className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 ${
                adminPasswordError ? 'border-red-400' : 'border-slate-300'
              }`}
            />
            {adminPasswordError && <p className="text-xs text-red-600 mb-3">{adminPasswordError}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowAdminModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={() => {
                  if (adminPasswordInput === '2011') {
                    setIsAdminUnlocked(true);
                    setShowAdminModal(false);
                    setAdminPasswordInput('');
                  } else {
                    setAdminPasswordError('Mật khẩu không đúng');
                  }
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <h2 className="font-bold text-slate-900 mb-1">
              {passwordAction === 'reset' ? 'Reset trạng thái đã dùng' : 'Xoá đánh giá AI'}
            </h2>
            <p className="text-sm text-slate-500 mb-4">Nhập mật khẩu để xác nhận thao tác này.</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="Mật khẩu"
              autoFocus
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            />
            {passwordError && (
              <p className="text-xs text-red-600 mb-3">{passwordError}</p>
            )}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {showGenerator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="font-bold text-slate-900">Tạo đánh giá bằng AI</h2>
              </div>
              <button
                onClick={() => { setShowGenerator(false); setGenerateError(''); setGenerateSuccess(''); }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-xs text-purple-900">
                <p className="leading-relaxed">
                  AI sẽ dựa trên mẫu đánh giá hiện có để tạo thêm các đánh giá mới với phong cách tương tự. Sử dụng Groq API (model Llama 3.3 70B).
                </p>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <Key className="w-4 h-4" />
                  Groq API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => saveApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                />
                <p className="text-xs text-slate-500 mt-1.5">
                  Lấy API key miễn phí tại <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">console.groq.com/keys</a>. Key chỉ lưu trên thiết bị của bạn.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Ngôn ngữ</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(DEFAULT_REVIEWS).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => setActiveLang(code)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        activeLang === code
                          ? 'bg-purple-50 border-purple-500 text-purple-700 font-medium'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {data.flag} <span className="hidden sm:inline">{data.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Số lượng đánh giá: <strong>{generateCount}</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(parseInt(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>

              {generateError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800 flex gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{generateError}</span>
                </div>
              )}
              {generateSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800 flex gap-2">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{generateSuccess}</span>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={generating || !apiKey.trim()}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-3 rounded-xl transition-all text-sm"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tạo {generateCount} đánh giá...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Tạo {generateCount} đánh giá mới
                  </>
                )}
              </button>

              {generatedTotal > 0 && (
                <button
                  onClick={handleDeleteGenerated}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Xoá {generatedTotal} đánh giá AI đã tạo
                </button>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
                <p className="font-medium text-slate-700 mb-1">Lưu ý:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Đánh giá AI được chia sẻ với tất cả người dùng</li>
                  <li>API key được lưu riêng trên thiết bị của bạn</li>
                  <li>Groq cung cấp free tier để sử dụng</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
