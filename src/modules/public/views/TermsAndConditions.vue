<template>
  <main class="terms">
    <div class="content mx-auto" style="max-width: 1400px">
      <v-container>
        <h1 class="main-title primary--text mb-16">
          الشروط و الاحكام و سياسة الاستخدام
        </h1>

        <div class="section" v-for="section in content" :key="section.id">
          <span class="subtitle primary--text d-block mt-10 mb-5">{{
            section.title
          }}</span>
          <p
            class="paragraph secondary--text mb-4"
            v-for="(paragraph, index) in section.paragraphs"
            :key="index"
          >
            {{ paragraph.text }}
          </p>
        </div>
      </v-container>
    </div>
  </main>
</template>

<script>
export default {
  name: "TermsAndConditions",

  data: () => ({
    content: [
      {
        id: 1,
        title: "1- العلاقة التعاقدية",
        paragraphs: [
          {
            text: "1.1- تشكل البنود والشروط اتفاقية بينك كفرد ، (المستخدم) من داخل المملكة العربية السعودية وجميع المناطق الجغرافية الأخرى التي تخضع فيها second opinion لأنشطة تجارية ، من تطبيقات الهاتف المحمول ، والمواقع الإلكترونية ، والمحتوى ، والمنتجات والخدمات التي توفرها شركة second opinion السعودية المسجلة في المملكة العربية السعودية بموجب السجل التجاري رقم. 1010829627 ، المالك والمشغل لموقع وتطبيق second opinion (نحن).",
          },
          {
            text: "1.2- يشكل وصولك إلى الخدمات واستخدامك لها موافقتك على الالتزام بهذه الشروط ، مما ينشئ علاقة تعاقدية بينك وبين second opinion باستخدام الخدمات ، فإنك توافق على الالتزام بهذه الشروط ويجب أن تحدد مربع 'أوافق' أدناه موضحًا موافقتك على هذه الشروط.",
          },
          {
            text: "1.3- باستخدام الخدمات ، أنت توافق على أن لديك القدرة الكاملة للدخول في اتفاقية ملزمة قانونًا ، وأن تكون مسؤولاً في حالة انتهاكك للشروط. بخلاف ذلك ، فأنت تدرك أن second opinion قد تنهي أو تعوق استخدامك للخدمات.",
          },
          {
            text: "1.4- أنت تدرك وتقر بأنه يجوز ل second opinion تعديل الشروط المتعلقة بالخدمات من وقت لآخر. يخطرك second opinion بهذه التغييرات على الشروط وموافقتك على الشروط المعدلة مطلوبة لمواصلة استخدام الخدمات.",
          },
          {
            text: "1.5- يوافق المستخدمون على أنه يمكن لـ second opinion الاتصال بهم عن طريق الرسائل النصية أو المكالمات الهاتفية على أرقام الهواتف التي يقدمونها عند تسجيلات المستخدم بما في ذلك لأغراض التسويق الداخلي لـ second opinion. لن يشكل هذا إفصاحًا أو مشاركة لأي من معلومات التعريف الشخصية الخاصة بك.",
          },
          {
            text: "1.6- من خلال الوصول إلى أي جزء من الخدمات أو استخدامه ، فإنك توافق على أنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط ، بالإضافة إلى أي إرشادات أو سياسات أو قواعد إضافية متاحة حسب الاقتضاء على second opinion وخدماته ، بما في ذلك على سبيل المثال لا الحصر ، سياسة خصوصية second opinion وسياسة خصوصية الطبيب. تم دمج هذه السياسات والإرشادات هنا بالرجوع إليها في الشروط. إذا كنت لا توافق على الالتزام بهذه الشروط وعلى اتباع جميع القوانين والمبادئ التوجيهية والسياسات المعمول بها ، فلا تدخل إلى الخدمات أو تستخدمها.",
          },
        ],
      },
      {
        id: 2,
        title: "2- الخدمات",
        paragraphs: [
          {
            text: "2.1- يشكل هذا منصة تقنية تتيح لمستخدمي تطبيق second opinion للهاتف المحمول أو موقع الويب البحث عن المواعيد وحجزها ، فضلاً عن طلب الاستشارة الطبية عن بُعد والتشخيص من خلال second opinion مع مقدمي الرعاية الصحية المستقلين مثل الأطباء في العيادات الفردية والعيادات الشاملة والمستشفيات والمختبرات والفحوصات ، والاتصال بالصيدليات المحلية للحصول على الأدوية وطلبات الأدوية (يُشار إليها معًا باسم 'المزود'). نحن لا نقدم المشورة الطبية أو التشخيص أو العلاج. نحن لا نصادق ولا نوصي بأنك مقدم خدمة محدد. نحن لا - ولا ننوي - ممارسة الطب. نحن نساعدك فقط في البحث والحجز والاتصال بالموفر الأكثر ملاءمة وفقًا لاحتياجاتك الطبية. لذلك ، من الأهمية بمكان أن تستخدم نفس الحكمة والحصافة التي ستعمل بها دون استخدام خدماتنا.",
          },
        ],
      },
      {
        id: 3,
        title: "3- الترخيص و الملكية الفكرية",
        paragraphs: [
          {
            text: "3.1- جميع التراخيص والممتلكات الفكرية بما في ذلك على سبيل المثال لا الحصر العلامات التجارية والشعار مملوكة حصريًا لـ second opinion . لا يجوز لك تحمل أي عمل قد يشكل إساءة استخدام أو انتهاكًا لحقوق الطبع والنشر لـ second opinion ، بما في ذلك التسويق الكاذب أو الإعلانات المضللة ، أو نسخة من تراخيص second opinion أو العلامة التجارية تحت أي ظرف من الظروف. باستخدام خدماتنا ، تمنحك second opinion بموجب هذا حقًا محدودًا وقابل للإلغاء وغير حصري وغير قابل للترخيص الداخلي ، الحق في: (1) الوصول إلى تطبيق الجوال أو موقع الويب الخاص بنا وتحميله واستخدامه لغرض وحيد هو استخدام خدماتنا ؛ و (2) الوصول إلى واستخدام المعلومات والمواد المقدمة أو المتوفرة أو الموجودة بطريقة أخرى في المحتوى الخاص بنا.",
          },
          {
            text: "3.2- هذا الترخيص هو ؛- لا يُقصد به التنازل عنها أو بيعها أو تأجيرها أو تصديرها أو استيرادها أو توزيعها أو نقلها أو منحها لأطراف أخرى.- غير مخصص للاستخدام التجاري. أنت مرخص فقط لاستخدام خدماتنا للاستخدام الشخصي غير المربح وغير التجاري.",
          },
        ],
      },
      {
        id: 4,
        title: "4- تقديم الخدمات",
        paragraphs: [
          {
            text: "4.1- أنت تقر بأن بعض الخدمات يتم توفيرها تحت أسماء مختلفة يشار إليها حاليًا باسم 'الحجوزات' و 'العروض' . أنت تقر أيضًا بإمكانية إتاحة الخدمات بموجب (1) بعض الشركات الفرعية والتابعة لـ second opinion أو (2) مقدمي الخدمة المستقلين.",
          },
        ],
      },
      {
        id: 5,
        title: "5- وصف الخدمات",
        paragraphs: [
          {
            text: "الحجوزات: حجز المواعيد مع الأطباء في العيادات الفردية والمستوصفات والمستشفيات والمختبرات والفحوصات.",
          },
          {
            text: "عروض: حجز الخدمات الطبية مع مختلف مقدمي الخدمات بأسعار مخفضة.",
          },
          {
            text: "الاستشارة / الاستشارة عن بعد: الممارسة الطبية عن بعد والاستشارة باستخدام تكنولوجيا الاتصالات والمعلومات مع مقدم الرعاية الصحية.",
          },
        ],
      },
      {
        id: 6,
        title: "6- المحتوى الخاص بنا",
        paragraphs: [
          {
            text: "6.1- جميع النصوص والبيانات والرسومات والصور والصور الفوتوغرافية والفيديو والصوت والمعلومات والاقتراحات والإرشادات والمواد الأخرى المقدمة أو المتوفرة بطريقة أخرى في خدماتنا هي جزء من حقوق الملكية الفكرية لـ second opinion.",
          },
          {
            text: "6.2- يجوز لك طباعة المعلومات وتنزيلها وتخزينها من المحتوى الخاص بنا في الوقت الذي يناسبك ، ولكن second opinion لا يمنحك أي حقوق تتعلق بحقوق الملكية الفكرية الخاصة به.",
          },
        ],
      },
      {
        id: 7,
        title: "7- حقوق الملكية الفكرية للأطراف الثالثة",
        paragraphs: [
          {
            text: "7.1- قد يحتوي النظام الأساسي ل second opinion على روابط إلى مواقع ويب أو معلنين أو خدمات لأطراف ثالثة ليست مملوكة لـ second opinion. أنت تقر وتفهم أن مثل هذا المحتوى قد يخضع لشروط استخدام وسياسات خصوصية مختلفة عن second opinion . لذلك ، لا تنطبق الشروط الحالية عليك عند الوصول إلى خدمات الجهات الخارجية أو استخدامها.",
          },
          {
            text: "7.2- إذا قمت بالوصول إلى مواقع الويب الخاصة بأطراف ثالثة من موقع ويب second opinion ، فأنت تفعل ذلك على مسؤوليتك الخاصة وتوافق على إعفاء second opinion من أي وجميع المسؤوليات الناشئة عن هذا الاستخدام.",
          },
        ],
      },
      {
        id: 8,
        title: "8- استخدام الخدمات",
        paragraphs: [
          {
            text: "8.1- حسابات المستخدمين",
          },
          {
            text: "8.1.1- لإنشاء حساب مستخدم ، سوف ترسل إلى second opinion المعلومات الشخصية ، مثل اسمك وعنوانك ورقم هاتفك المحمول والبريد الإلكتروني. أنت توافق على منح second opinion الحق في مشاركة هذه المعلومات الشخصية مع مزودي الخدمة المسجلين لدينا وفقًا لاتفاقنا التعاقدي معهم ؛- يجب أن تكون بياناتك الشخصية دقيقة وكاملة ومحدثة في جميع الأوقات. في حالة عدم القيام بذلك ، فإنك تقر بأن second opinion له الحق في إنهاء أو إعاقة استخدامك للخدمات.- يجب عليك اختيار كلمة مرور للوصول إلى حساب المستخدم الخاص بك ويجب أن تحافظ على سريتها في جميع الأوقات.- أنت تدرك أنك ستكون مسؤولاً عن أي إجراءات / أنشطة تتم على حساب المستخدم الخاص بك من قبل أطراف ثالثة غير مصرح لها. يجب عليك إخطارنا إذا كنت تعتقد بشدة أن حسابك قد تم اختراقه.- لا يجوز لك تحت أي ظرف من الظروف الرد على طلب للحصول على كلمة المرور الخاصة بك ، وخاصةً طلب من شخص يدعي أنه موظف في second opinion .- لا يجوز لك تفويض أو تعيين أو نقل حساب المستخدم الخاص بك إلى أطراف ثالثة.- أنت تدرك أنه سيتم رفض وصولك إلى حسابك إذا فشلت في إدخال كلمة مرورك مرتين متتاليتين.- أنت توافق وتقر على الخدمات التي تقدمها second opinion بما في ذلك الاستشارة عن بعد وتوافق على التوقيع على نموذج الموافقة المتعلق بهذه الخدمات عند تقديمها.",
          },
          {
            text: "8.1.2- أنت توافق على تزويد second opinion بالمعلومات الأساسية المطلوبة من أجل استخدام الخدمات. يجب أن تكون هذه المعلومات الشخصية خاصة وسرية وتخضع لسياسة خصوصية second opinion بموجب القانون للحفاظ على خصوصية وأمن المعلومات الصحية المحمية للمستخدمين. تعتبر second opinion والشركات التابعة لها أن خصوصية المعلومات الصحية هي أحد أهم العناصر في العلاقة مع المستخدمين. مسؤولية second opinion للحفاظ على سرية المعلومات الصحية هي مسؤولية يأخذها second opinion على محمل الجد.",
          },
          {
            text: "8.1.3- من خلال الوصول إلى الخدمات واستخدامها ، فإنك توافق على استخدام عنوان بريدك الإلكتروني لإرسال إشعارات متعلقة بالخدمة أو تغيير الميزات أو العروض الخاصة بما في ذلك أي إشعارات مطلوبة بموجب القانون ، بدلاً من الاتصال بالبريد العادي.",
          },
          {
            text: "8.2- متطلبات المستخدم",
          },
          {
            text: "8.2.1- انت مؤهل فقط للوصول الى خدماتنا و استخدامها اذا كان عمرك 18 عاما على الاقل، و لن يتم مساءلة Second opinion من قبل المستخدمين القاصرين.",
          },
          {
            text: "8.3- المحتوى المقدم من المستخدم",
          },
          {
            text: "8.3.1- تحتفظ بالملكية الكاملة للمحتوى الذي تقوم بتحميله أو إرساله أو تخزينه أو إرساله أو تلقيه إلى خدماتنا ولديك الحق المطلق في نشره. أنت تقر أيضًا أنه في هذه العملية ، تمنح أيضًا second opinion والشركات التابعة لها ترخيصًا عالميًا لاستخدام مثل هذا المحتوى واستضافته وتخزينه وإعادة إنتاجه وتعديله وإنشاء أعمال مشتقة منه والتواصل والنشر والأداء العام وعرضه وتوزيعه بشكل عام. الحقوق التي تمنحها second opinion هي لغرض محدود وهو تشغيل خدماتنا وتعزيزها وتحسينها وتطوير خدمات جديدة. تظل هذه الحقوق سارية حتى بعد توقفك عن استخدام خدماتنا.",
          },
        ],
      },
      {
        id: 9,
        title: "9- التقييمات",
        paragraphs: [
          {
            text: "9.1- تتيح لك خدماتنا مشاركة التعليقات والتعليقات والمراجعات والآراء والتوصيات (يُشار إليها معًا باسم 'التقييمات') فيما يتعلق بجودة الخدمات التي يوفرها second opinion وجودة الخدمة المقدمة لك من قبل مقدمي الخدمة.",
          },
          {
            text: "9.2- المراجعات والتوصيات والتعليقات التي أدلى بها المستخدمون الآخرون ، لا تشارك second opinion أو تؤيد أو توصي بمثل هذه التقييمات ، وليس لها سلطة الإشراف أو التوجيه أو التحكم في مثل هذه التقييمات.",
          },
          {
            text: "9.3- يجوز لـ second opinion - ولكن ليس ملزمًا - مراقبة أو إزالة تعليقات المستخدمين وتقييماتهم وفقًا لتقديرها الخاص ، في أي وقت وبدون إشعارات أخرى للمستخدمين",
          },
          {
            text: "9.4- من المهم ملاحظة أن التقييمات هي حسابات شخصية مباشرة للمستخدمين الفرديين ولا تشكل حكم مقدم الخدمة ولا نتائج العلوم الطبية. يجب أن تفهم أن التقييمات الواردة فيها هي من أولئك الذين يقدمون نفس الشيء ، وأن هذه التقييمات لا تعكس آراء second opinion ولا تشكل بأي حال من الأحوال تأييدنا أو توصيتنا لها. لذلك ، لن يتحمل second opinion أي مسؤولية عن أي من التقييمات المنشورة. علاوة على ذلك ، يجب أن تضع في اعتبارك أن التقييمات عرضة للأخطاء والتحيزات الشائعة في الحسابات الشخصية المباشرة ولا ينبغي افتراض أنها موثوقة أو خالية من الأخطاء.",
          },
        ],
      },
      {
        id: 10,
        title: "10- الدفع",
        paragraphs: [
          {
            text: "10.1- يمكنك اختيار الدفع من خلال أي طرق دفع متاحة بما في ذلك بطاقة الائتمان وبطاقة الخصم ومدى والمحافظ الرقمية عبر منصتنا. ستكون المدفوعات شاملة الضرائب المطبقة حيثما يقتضي القانون ذلك.",
          },
          {
            text: "10.2- تحتفظ second opinion بالحق في إنشاء و / أو إزالة و / أو مراجعة الرسوم في أي وقت وفقًا لتقديرها الخاص. قد تقدم second opinion من وقت لآخر عروضًا ترويجية وخصومات لمستخدمين معينين قد ينتج عنها مبالغ مختلفة يتم تحصيلها مقابل الخدمات",
          },
          {
            text: "10.3- فيما يتعلق بمقدمي الطرف الثالث (TPP) ، ستكون المدفوعات مستحقة مباشرة لمقدمي الطرف الثالث ، وستقوم second opinion بتحصيل مدفوعات هذه الرسوم منك ، لذلك قد يحتاج المستخدم إلى الالتزام بشروط الدفع الخاصة بـ TPP.",
          },
        ],
      },
      {
        id: 11,
        title: "11- سياسة الاسترداد",
        paragraphs: [
          {
            text: "11.1- الرسوم التي تدفعها نهائية وغير قابلة للاسترداد ، ما لم تحدد second opinion خلافًا لذلك.",
          },
          {
            text: "11.2- سيتم رد الأموال بنفس طريقة الدفع ، إن وجدت.",
          },
          {
            text: "11.3- تحتفظ second opinion بحقها في رد أي مبالغ إلى حساب المستخدمين لاستخدامها في خدمات أخرى وفقًا لتقديرها الخاص. لن تكون second opinion مسؤولة ولن تضمن مستوى معينًا من الرضا الطبي ولن تكون مسؤولة عن أي استشارات غير راضية يقدمها المزود. لا يحق للمستخدمين استرداد رسوم الاستشارة وأي مصروفات تتم على طول الطريق في حال لم تكن راضيًا عن الخبرة الطبية أو مقدم الخدمة.",
          },
        ],
      },
      {
        id: 12,
        title: "12- اخلاء المسؤولية و تحديد الاهلية",
        paragraphs: [
          {
            text: "12.1- على الرغم من أننا نستخدم التدابير المتعلقة بالتحقق من مقدمي الخدمات (يجب على جميع مقدمي الخدمة تقديم التراخيص والتصاريح والشهادات المطلوبة بموجب القانون لممارسة الطب) ، لا يضمن second opinion أن يكون محتواه دائمًا خاليًا من الأخطاء أو كاملًا أو دقيقًا أو محدث.",
          },
          {
            text: "12.2- لن تتحمل second opinion أي مسؤولية عن الأضرار التي تلحق بك بما في ذلك على سبيل المثال لا الحصر ، الأضرار المباشرة أو غير المباشرة أو الخاصة أو التبعية أو العقابية أو العرضية ، الناشئة عن أو فيما يتعلق بأي من الأفعال التالية التي يرتكبها مقدمو الخدمة:- عدم الالتزام بالآداب العامة ؛- السلوك غير المهني أو غير الأخلاقي أو المخزي ؛- التشخيص الخاطئ أو المتأخر لحالة طبية ؛- العلاج غير الصحيح ، وتأخير العلاج ، أو عدم العلاج على الإطلاق ؛- سوء التصرف الطبي أو الإهمال ؛- إلغاء الموعد أو تأخر المزود أو عدم الحضور على الإطلاق في موعد الفحص. أنت تدرك وتقر بأن second opinion لن تكون مسؤولة عن أي أضرار أو وفيات أو إصابات أو أمراض متعاقد عليها أو خسائر أو تكاليف أو مصروفات مهما كانت طبيعتها الناجمة عن مقدم الخدمة.",
          },
        ],
      },
      {
        id: 13,
        title: "13- القوة القاهرة",
        paragraphs: [
          {
            text: "13.1- لن تكون second opinion مسؤولة عن الإخفاق في أداء التزاماتها بموجب هذه الشروط بسبب حدوث أي حدث خارج عن سيطرتها المعقولة ، بما في ذلك ، على سبيل المثال لا الحصر ، الحرائق ، والإرهاب ، والكوارث الطبيعية ، والأوبئة ، والحرب ، والمقاطعة ، واضطراب العمل أو انقطاع الإنترنت أو الاتصالات أو انقطاع الخدمة أو أي حالات أخرى لا يمكن توقعها أو منعها أو السيطرة عليها.",
          },
        ],
      },
      {
        id: 14,
        title: "14- تحديد المسئولية",
        paragraphs: [
          {
            text: "14.1- إلى الحد الذي يسمح به القانون ، لن تتحمل second opinion أو مسؤوليها أو مديريها أو موظفيها أو وكلائها بأي حال من الأحوال المسؤولية تجاهك عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو عقابية أو تبعية على الإطلاق ، الناتجة عن أو فيما يتعلق بأي (1) أخطاء أو عدم دقة في المحتوى ، (2) إصابة شخصية أو ضرر من أي نوع كان ، ناتجًا عن وصولك إلى خدماتنا واستخدامها ، (3) أي غير مصرح به الوصول إلى أو استخدام خوادمنا الآمنة و / أو أي وجميع المعلومات الشخصية و / أو المعلومات المالية المخزنة فيها ، (4) أي انقطاع أو توقف للإرسال إلى أو من خدماتنا ، (4) أي أخطاء أو فيروسات أو أحصنة طروادة ، أو ما شابه ، والتي قد يتم نقلها إلى أو من خلال خدماتنا من قبل أي طرف ثالث ، (5) أي أخطاء طبية أو تشخيصية أو إغفالات أو وصفات طبية في أي محتوى أو عن أي خسارة أو ضرر من أي نوع يحدث نتيجة لذلك لاستخدامك لأي محتوى تم نشره أو إرساله بالبريد الإلكتروني أو نقله ، أو تم توفيرها بطريقة أخرى عبر الخدمات ، سواء استنادًا إلى ضمان أو عقد أو ضرر أو أي نظرية قانونية أخرى ، وما إذا كان الموفر قد حذر من احتمال حدوث مثل هذه الأضرار أم لا. يسري تحديد المسؤولية السابق ذكره إلى أقصى حد يسمح به القانون.",
          },
          {
            text: "14.2- أنت تقر تحديدًا بأن second opinion لن تكون مسؤولة عن السلوك التشهيري أو العدواني أو غير القانوني لأي طرف ثالث وأن المخاطر أو الأذى أو الضرر الناجم عن ما سبق يقع عليك بالكامل.",
          },
          {
            text: "14.3- علاوة على ذلك ، يتم التحكم في هذه الخدمات وتقديمها بواسطة second opinion من منشآتها. لا تقدم second opinion أية إقرارات بأن الخدمة مناسبة أو متاحة للاستخدام في خدمات المواقع الأخرى. أولئك الذين يصلون إلى الخدمة أو يستخدمونها من ولايات قضائية أخرى يفعلون ذلك بمحض إرادتهم ويكونون مسؤولين عن الامتثال لقانونهم المحلي.",
          },
        ],
      },
      {
        id: 15,
        title: "15- القانون الحاكم",
        paragraphs: [
          {
            text: "15.1- تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع ينشأ فيما يتعلق بهذه الشروط ، يجب تسويته وسماعه أمام المحاكم المختصة في الرياض ، المملكة العربية السعودية.",
          },
        ],
      },
      {
        id: 16,
        title: "16- الامتثال للقوانين المحلية",
        paragraphs: [
          {
            text: "16.1- يعتمد تطبيق الخدمات واستخدامها على امتثالها للقوانين واللوائح المعمول بها في الموقع الذي تُستخدم فيه الخدمات.",
          },
          {
            text: "16.2- تحتفظ second opinion بالحق - وفقًا لتقديرها وحدها - في رفع إجراءات النزاع أمام أي محكمة تنطبق سلطتها القضائية على المستخدم المعني.",
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.terms {
  padding: 50px 0;

  .main-title {
    font-size: 2rem;
    font-weight: 700;
  }
  .subtitle {
    font-size: 1.3rem;
    font-weight: 600;
  }

  .paragraph {
    font-size: 1rem;
    font-weight: 400;
    line-height: 2;
  }
}
</style>
