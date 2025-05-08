var store = [{
        "title": "理解 Rust impl Trait 機制",
        "excerpt":"impl Trait 本身可看作 Rust 補充類型系統的修補，但正確理解其必要性需要從 Rust 語言更底層的問題談起。 impl Trait作為參數 impl Trait的出現，直接目的為：填補 closure 和 iterator 機制遺留的問題。 以 closure 為例。開發者可能要面臨將函數作為參數傳入另一函數的情景，通常大家會選擇函數指針fn來完成此任務。 問題如下：closure 也可以傳給函數指針fn嗎？ 答案：有時可以，有時不行 不可傳的情況 fn main() { let f = |x: i32| -&gt; i32 { x + 1 }; let f_1 = |x: i32| -&gt; i32 { f(f(x)) }; let x =...","categories": ["2020"],
        "tags": ["2020-05"],
        "url": "https://yunlingz.github.io/2020/05/05/rust-impl-trait/",
        "teaser":null},{
        "title": "如何自建 DNS 服務器",
        "excerpt":"在合理網絡節點自建 DNS 服務器，可以優化域名解析速度。本文操作以 Arch Linux 為例。 首先安裝dnsmasq，然後備份dnsmasq的原配置文件。 sudo pacman -S dnsmasq sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.default dnsmasq配置 創建新的/etc/dnsmasq.conf，編輯其內容如下 # replace with your net interfaces interface=lo,eth0 cache-size=2048 strict-order no-resolv server=1.1.1.1 server=1.0.0.1 server=8.8.8.8 server=8.8.4.4 server=208.67.222.222 server=208.67.220.220 address=/xxx.com/127.0.0.2 如果網絡環境依賴於某些預配置的 dns 服務器（通常能於/etc/resolv.conf中查到），需要依照server=x.x.x.x的格式，將他們緊接在no-resolv下方。 本文自建的 DNS 服務器，不是完全意義上的 DNS，而是一個從第三方 DNS 服務商獲取記錄的緩存器。其工作原理如下，當外部用戶首次訪問此 DNS 服務器，提供 dns 查詢服務的 dnsmasq 如發現本地沒有緩存記錄，便會向server們按順序查詢（strict-order保證了順序不被隨機）（這裡選用三大 dns...","categories": ["2020"],
        "tags": ["2020-08"],
        "url": "https://yunlingz.github.io/2020/08/23/dnsmasq/",
        "teaser":null},{
        "title": "DigitalOcean 主機磁盤 Ext4 轉 XFS",
        "excerpt":"重要：本文中的操作具有極大風險，僅供具備相關經驗的讀者參考，請勿當成手冊來操作，操作前請務必備份數據。本文作者對可能的風險以及後果不承擔任何責任。 重要：本文中的操作具有極大風險，僅供具備相關經驗的讀者參考，請勿當成手冊來操作，操作前請務必備份數據。本文作者對可能的風險以及後果不承擔任何責任。 重要：本文中的操作具有極大風險，僅供具備相關經驗的讀者參考，請勿當成手冊來操作，操作前請務必備份數據。本文作者對可能的風險以及後果不承擔任何責任。 出於目前尚未知曉的原因，使用本文的思路對 Fedora 主機無法實操成功。 本文以將安裝於 ext4 上的 debian 遷移到 xfs 為例。 利用 Recovery 進入修復模式，do 會掛載一個 debian 或 ubuntu 的 live 鏡像方便我們操作。 進入入口在 Recovery&gt;Boot from Recovery ISO，記得在切換啟動盤前先關機。 首先我們需要了解 Do 的虛擬主機的磁盤構成 Disk /dev/vda: 20 GiB, 21474836480 bytes, 41943040 sectors Units: sectors of 1 * 512 = 512 bytes Sector size...","categories": ["2020"],
        "tags": ["2020-09"],
        "url": "https://yunlingz.github.io/2020/09/09/ext-to-xfs-do/",
        "teaser":null},{
        "title": "為什麼內核設計了 Direct I/O",
        "excerpt":"以 Linux 內核為例，默認狀態下大部分讀寫邏輯使用 Buffered I/O，所以當我們寫入某文件時，並不會直接寫入物理設備，而是寫入 kernel 的 page cache，然後返回「寫成功」。page cache 中的記錄何時寫到物理設備上由 kernel 控制，用戶空間程序看不到這一過程。 Buffered I/O 狀態下，當用戶空間程序讀取此文件時，kernel 會先在 page cache 中查詢，如果命中則直接返回，未命中則先從物理設備上讀取到 page cache，再從 page cache 返回結果。這個過程很像我們在開發數據應用程序時會給 postgresql 上加一層 redis 緩存，主要目的為提高讀寫效率。 而 Direct I/O 則會繞開 page cache，允許用戶空間程序直接讀寫物理設備。Direct I/O 之所以有重大意義，正因為 Buffered I/O 在特殊情境下無法滿足用戶空間程序的需求。 舉個例子，LSM-Tree 的 level 0 tree 活躍於內存上，是一個有固定最大容量限制的結構（實際上不一定是 Tree），也扮演了緩存的角色。level 0 tree 在容量達標後會與物理設備上的下一個...","categories": ["2020"],
        "tags": ["2020-09"],
        "url": "https://yunlingz.github.io/2020/09/22/direct-io/",
        "teaser":null},{
        "title": "使用現代 C++ 風格的 Status code",
        "excerpt":"對待 C++ exceptions 的態度 我不建議在 C++ 工程裡使用 exceptions。確實在某些例子裡，C++ exceptions 看起來很方便，但實際工程中鋪開 exceptions 不僅會讓代碼極難維護，更會由於需要照顧到內存狀態安全性而使代碼複雜度陡增（畢竟 C++ 不是 Java，沒有 GC 幫我們照顧拋出異常後的內存狀態安全）。 不使用 exceptions 的另一個原因是因為要為實時系統編寫代碼，拋 exceptions 無法保證硬實時性。把目光放寬的話，C++ 作為一門近裸機語言，能支持它 exceptions 特性的硬環境，其實並不多。 統一管理 error code 既然不使用 exceptions 來彙報錯誤，那麼唯一的選擇只有錯誤碼。 樣例代碼 namespace demo { class Status { private: enum class Code { kOK = 0, kFileNotFound, kFileNotOpened, kInvalidArg, kTargetLoss,...","categories": ["2020"],
        "tags": ["2020-09"],
        "url": "https://yunlingz.github.io/2020/09/29/modern-cpp-error-handling/",
        "teaser":null},{
        "title": "FreeBSD 桌面環境",
        "excerpt":"由於打算將一臺 BSD 主機臨時用作桌面環境，決定給其裝上 XFCE。 安裝圖像驅動 對於 Intel 集成顯卡主機，安裝 xf86-video-intel 包： # pkg install xf86-video-intel 其他類型的顯卡可以參考：https://wiki.freebsd.org/Graphics和https://www.freebsd.org/doc/handbook/x-config.html 安裝x11 # pkg install xorg 注意這一步是必須的，因為 FreeBSD 的 ports 樹裡，x11 並不是任何常見桌面環境（如 GNOME、KDE 等）的依賴。 安裝XFCE和Login Manager # pkg install xfce # pkg install x11/sddm 我習慣使用 SDDM 作為 Login Manager。 配置/etc/rc.conf 加入以下配置 dbus_enable=\"YES\" hald_enable=\"YES\" sddm_enable=\"YES\" moused_enable=\"YES\" 前兩行啟用了...","categories": ["2020"],
        "tags": ["2020-10"],
        "url": "https://yunlingz.github.io/2020/10/06/freebsd-desktop/",
        "teaser":null},{
        "title": "C const 與 C++ const 的不同及常見錯誤",
        "excerpt":"const 可見性的區別 對於符號的鏈接可見性：在 C 中，const 全局變量默認為 external；而在 C++中則默認為 internal。 C main.c: #include &lt;stdio.h&gt; #include &lt;stdlib.h&gt; int main() { extern const int x; printf(\"%d\\n\", x); return EXIT_SUCCESS; } x.c: const int x = 1000; gcc main.c x.c -std=gnu99 -Wall -Wextra可編譯成功，運行後輸出1000。 原因：在 C 中，函數與全局變量的聲明默認均為外部可見，即編譯器默認將 x.c 中的const int x = 1000;視作extern const int...","categories": ["2021"],
        "tags": ["2021-01"],
        "url": "https://yunlingz.github.io/2021/01/02/c-const/",
        "teaser":null},{
        "title": "利用位運算節省 bool 數組內存佔用",
        "excerpt":"由於布爾值在內存中只需要一個 bit 位就可以表示和計算，而 bool 類型和 integer 類型都會佔用遠大於 1 個 bit 的空間，所以，使用 bool 或 integer 作為基礎類型來存儲布爾連續向量，是缺乏內存效率意識的設計。 高效的設計為：借鑑 bloom filter 的思想，利用連續的 byte 來存儲以 8 個布爾值為段的數組。這樣就能將內存使用優化為本來（假設原先使用 char 來表示單個布爾）的 1/8。 class BitBoolArray { public: explicit BitBoolArray(size_t n) : cap_((assert(n &gt; 0), n)), arr_(std::make_unique&lt;uint8_t[]&gt;((cap_ - 1) / 8 + 1)) {} virtual ~BitBoolArray() = default;...","categories": ["2021"],
        "tags": ["2021-01"],
        "url": "https://yunlingz.github.io/2021/01/27/bit-bool-array/",
        "teaser":null},{
        "title": "如何將 linux 默認內存分配器替換為 jemalloc",
        "excerpt":"jemalloc 是 BSD 類系統的默認內存分配器，其在內存分配上比 glibc malloc 的實現更加高效，使用 jemalloc 能夠在一定程度上減少常駐程序的內存佔用，減輕內存碎片問題，提升動態內存使用效率。 通常，使用 jemalloc 的方法有兩種，一種是把 jemalloc 直接鏈接進程序，如 redis；另一種是利用 LD_PRELOAD 來使得 jemalloc 在程序運行時被預先動態加載，從而使得程序調用的 malloc/free 函數由 jemalloc 的動態庫提供，而非 libc。 方法 不過，這兩種使用方式都不太優雅。更優雅的辦法是用 jemalloc 直接在整個系統中全局替代 glibc malloc，這樣我們既不用手動改變已有程序的運行方式（如加 LD_PRELOAD），也不用在編譯新程序時主動鏈接 jemalloc，就能讓系統中幾乎所有程序在運行時使用 jemalloc。 方法：編輯/etc/ld.so.preload，將 jemalloc 的動態庫的絕對路徑寫入此文件的首行。 比如在 Arch 上面，jemalloc 的動態庫位於/usr/lib/libjemalloc.so，那麼把這個路徑寫入/etc/ld.so.preload的首行即可。 原理：/etc/ld.so.preload相當於作用系統全局的LD_PRELOAD，所以我們的做法相當於讓系統中所有程序都在運行時被默認強制賦予了LD_PRELOAD=/usr/lib/libjemalloc.so的環境變量。 驗證 更改完/etc/ld.so.preload後，編寫一段含堆內存分配邏輯的 C 程序： #include &lt;stdlib.h&gt; int main() {...","categories": ["2021"],
        "tags": ["2021-01"],
        "url": "https://yunlingz.github.io/2021/01/27/jemalloc/",
        "teaser":null},{
        "title": "誰是「指環王」",
        "excerpt":"考證：託爾金書名《The Lord of the Rings》意指何人。 在原著中，佛羅多於幽谷醒來，他與甘道夫有如下一段對話： `Then you knew of the Riders already-before I met them?’ ‘Yes, I knew of them. Indeed I spoke of them once to you; for the Black Riders are the Ringwraiths, the Nine Servants of the Lord of the Rings. But I did not know...","categories": ["2021"],
        "tags": ["2021-06"],
        "url": "https://yunlingz.github.io/2021/06/06/lotr/",
        "teaser":null},{
        "title": "Practically explain Monads in plain TypeScript",
        "excerpt":"Programming by composing pure functions makes life easier, but real-world applications often depend on side effects. Functors and Monads provide ways of composing side effects operations within pure function chaining. This post provides a practical example to explain Monads in plain TypeScript. import * as readline from \"readline\"; // ------------------------------------------------------...","categories": ["2023"],
        "tags": ["2023-01"],
        "url": "https://yunlingz.github.io/2023/01/07/monad/",
        "teaser":null}]
