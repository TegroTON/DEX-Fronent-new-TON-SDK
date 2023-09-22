import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DexContext, DexContextType } from "../context";
import { DeLabConnector } from "../deLabContext";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { useSwitchTheme } from "../hooks/useSwitchTheme";
import { decompressAddr } from "./dex/Referral";
import { Notify } from "./dex/components/Notify";
import {TonConnectButton} from "@tonconnect/ui-react";
export function DefaultHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletInfo, setReferral } = useContext(DexContext) as DexContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  useEffect(() => {
    if (ref) {
      const maybeAddr = decompressAddr(ref);
      if (maybeAddr) {
        setReferral(maybeAddr);
      }
    }
  }, []);
  const disconnect = async () => {
    localStorage.clear();
    window.location.reload();
  };
  const go_back = () => navigate(-1);
  const switchTheme = useSwitchTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
  // console.log(expanded)
  const [showAlertCopyAddress, setShowAlertCopyAddress] = useState(false);

  return (
    <>
      {showAlertCopyAddress && (
        <Notify
          position="top-center"
          onClose={() => setShowAlertCopyAddress(false)}
          text="Wallet address copied! 😊"
        />
      )}
      <header className="header border-bottom mb-4 mb-lg-5">
        <Navbar
          expand="lg"
          collapseOnSelect
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          onSelect={() => setExpanded(false)}
        >
          <Container fluid className="px-auto px-xl-5">
            <Link to="/" className="header__logo">
              <img
                src="/assets/images/logotype.svg"
                alt=""
                className="header__logo-img"
              />
            </Link>
            <div className="d-block d-lg-none ms-auto me-4">
              {walletInfo?.isConnected ? (
                <div className="dropdown">
                  <Nav.Link
                    className="btn btn-sm-mobile box-blur border text-nowrap d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/assets/images/ton.png"
                      width={18}
                      height={18}
                      alt="Ton Coin"
                    />
                    <span className="fw-medium ms-2">
                      {`${walletInfo.balance.toString().slice(0, -7)} TON`}
                    </span>
                    <i className="fa-solid fa-angle-down ms-3" />
                  </Nav.Link>
                  <div
                    className="dropdown-menu bg-second border-0 mr-4 mt-2 shadow rounded position-absolute"
                    data-bs-popper="static"
                    style={{ right: "10px" }}
                  >
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${walletInfo.address.toString()}`
                        )
                      }
                    >
                      <i className="fa-light fa-copy dropdown-item-icon" />
                      <div className="ms-3">
                        Copy address
                        <div
                          className="text-truncate text-muted small"
                          style={{ maxWidth: "150px" }}
                        >
                          {`${walletInfo.address
                            .toString()
                            .slice(0, 6)} . . . ${walletInfo.address
                            .toString()
                            .slice(-6)}`}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      onClick={() => DeLabConnector.disconnect()}
                    >
                      <i className="fa-light fa-power-off dropdown-item-icon" />
                      <div className="ms-3">
                        Disconnect
                        <div className="text-muted small">
                          Disable your wallet
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </div>
                </div>
              ) : (
                <Nav.Item
                  onClick={() => DeLabConnector.openModal()}
                >
                </Nav.Item>
              )}
            </div>
            {/* Toogle Button */}
            <Navbar.Toggle
              data-bs-target="#navbarDexContent"
              data-bs-toggle="collapse"
              className="btn-toogler"
            >
              <span />
              <span />
              <span />
            </Navbar.Toggle>

            {/* Navigation Links */}
            <Navbar.Collapse id="navbarDexContent">
              <div className="d-flex flex-column flex-lg-row w-100">
                <Nav className="d-block d-lg-flex align-items-center order-2 order-lg-1 me-auto">
                  <Nav.Item>
                    <Link
                      className={`nav-link text-nowrap ${
                        location.pathname === "/swap" ? "active-link" : ""
                      }`}
                      to="/swap"
                      onClick={() => setExpanded(false)}
                    >
                      Swap
                    </Link>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <>
                        Wallet{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      href="https://tegro.io/wallet/"
                      target="_blank"
                      className="d-flex"
                    >
                      <i className="fa-light fa-wallet dropdown-item-icon" />
                      <div className="ms-3">
                        Web Wallet
                        <div className="text-muted small">
                          The easiest way to store, send, and receive Toncoin
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://play.google.com/store/apps/details?id=com.tonholdwallet.android"
                      target="_blank"
                    >
                      <i className="fa-brands fa-google-play dropdown-item-icon" />
                      <div className="ms-3">
                        Android App
                        <div className="text-muted small">
                          Wallet extension for Android
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://chrome.google.com/webstore/detail/cdpdjfhimjdmbakdbabcklagceoikifg"
                      target="_blank"
                    >
                      <i className="fa-brands fa-chrome dropdown-item-icon" />
                      <div className="ms-3">
                        Chrome App
                        <div className="text-muted small">
                          Wallet extension for Chrome browser
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://microsoftedge.microsoft.com/addons/detail/dgegbhgbijbhkmkacomdlogdkacokpam"
                      target="_blank"
                    >
                      <i className="fa-brands fa-edge dropdown-item-icon" />
                      <div className="ms-3">
                        Microsoft Edge
                        <div className="text-muted small">
                          Wallet extension for Edge browser
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        E-Commerce{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://tegro.io/commerce/"
                      target="_blank"
                    >
                      <i className="fa-light fa-money-check-dollar-pen dropdown-item-icon" />
                      <div className="ms-3">
                        Payment system
                        <div className="text-muted small">
                          Connection of payment systems and banks without
                          commissions.
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="p-3 fs-14 fw-medium text-muted  bg-transparent">
                      For Business
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://tegro.money/referral-program/"
                      target="_blank"
                    >
                      <i className="fa-light fa-handshake dropdown-item-icon" />
                      <div className="ms-3">
                        Affiliate program
                        <div className="ms-1 u-badge">new</div>
                        <div className="text-muted small">
                          Invite clients and get percentage of their turnover
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://tegro.money/security/"
                      target="_blank"
                    >
                      <i className="fa-light fa-shield-check dropdown-item-icon" />
                      <div className="ms-3">
                        Security
                        <div className="text-muted small">
                          About PCI DSS, SSL Security Standards
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="p-3 fs-14 fw-medium text-muted bg-transparent">
                      Developers
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://tegro.money/docs/en/"
                      target="_blank"
                    >
                      <div className="d-flex">
                        <i className="fa-light fa-book dropdown-item-icon" />
                        <div className="ms-3">
                          All documentation
                          <div className="text-muted small">
                            All ways of integration and interaction
                          </div>
                        </div>
                      </div>
                      <Row className="list-style-inside">
                        <Col>
                          <NavDropdown.Item
                            className="fs-14"
                            href="https://tegro.money/docs/en/begin/register/add-shop/"
                            target="_blank"
                          >
                            Adding a store
                          </NavDropdown.Item>
                        </Col>
                        <Col>
                          <NavDropdown.Item
                            className="fs-14"
                            href="https://tegro.money/docs/en/sci/create-payment/"
                            target="_blank"
                          >
                            Api Documentation
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        NFT{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://libermall.com/"
                      target="_blank"
                    >
                      <i className="fa-light fa-house dropdown-item-icon" />
                      <div className="ms-3">
                        Libermall
                        <div className="dropdown-item__desc text-muted small">
                          A new, modern and slick NFT marketplace
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex"
                      href="https://libermall.com/#explore"
                      target="_blank"
                    >
                      <i className="fa-light fa-hexagon-vertical-nft dropdown-item-icon" />
                      <div className="ms-3">
                        Explore Collections
                        <div className="text-muted small">
                          Catalog of NFT collections
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        More{" "}
                        <i className="fa-solid fa-angle-down small ms-auto ms-lg-2" />
                      </>
                    }
                    id="collasible-nav-dropdown"
                  >
                    <Row>
                      <Col>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://tegro.money/pay/coupons/"
                          target="_blank"
                        >
                          <i className="fa-light fa-badge-percent dropdown-item-icon" />
                          <div className="ms-3">
                            Discounts
                            <div className="text-muted small">And coupons</div>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://tegro.money/advantages/"
                          target="_blank"
                        >
                          <i className="fa-light fa-rocket-launch dropdown-item-icon" />
                          <div className="ms-3">
                            Advantages
                            <div className="text-muted small">
                              Use all the features of the service
                            </div>
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://tegro.gitbook.io/en/dex/bug-bounty"
                          target="_blank"
                        >
                          <i className="fa-light fa-bug dropdown-item-icon" />
                          <div className="ms-3">
                            Bug Bounty
                            <div className="text-muted small">
                              You can be rewarded for finding vulnerabilities in
                              Tegro.Finance
                            </div>
                          </div>
                        </NavDropdown.Item>
                      </Col>
                      <Col>
                        <Link
                          className="d-flex dropdown-item"
                          to="/privacy"
                          onClick={() => setExpanded(false)}
                        >
                          <i className="fa-light fa-file-contract dropdown-item-icon" />
                          <div className="ms-3">
                            Privacy policy
                            <div className="text-muted small">
                              Last updated October 5, 2021.
                            </div>
                          </div>
                        </Link>
                        <Link
                          className="d-flex dropdown-item"
                          to="/terms"
                          onClick={() => setExpanded(false)}
                        >
                          <i className="fa-light fa-file-contract dropdown-item-icon" />
                          <div className="ms-3">
                            Terms of use
                            <div className="text-muted small">
                              Last updated October 18, 2022.
                            </div>
                          </div>
                        </Link>
                        <NavDropdown.Item
                          className="d-flex"
                          href="https://t.me/TegroForum"
                          target="_blank"
                        >
                          <i className="fa-light fa-envelope-open-text dropdown-item-icon" />
                          <div className="ms-3">
                            Contact Us
                            <div className="text-muted small">Write to us</div>
                          </div>
                        </NavDropdown.Item>
                      </Col>
                    </Row>
                  </NavDropdown>
                </Nav>
                <Nav className="d-block d-lg-flex align-items-center align-items-lg-center border-top-mobile order-3 ms-0 ms-lg-2">
                  <Nav.Item className="me-0 me-lg-2">
                    <Nav.Link
                      className="btn btn-sm btn-link bg-transparent"
                      href="javascript://"
                      onClick={switchTheme}
                    >
                      <div className="dark-mode-icon w-100">
                        <div className="d-flex align-items-center w-100">
                          <span className="d-inline d-lg-none me-auto">
                            Dark Mode
                          </span>
                          <i
                            className="fa-solid fa-moon fs-16"
                            style={{ transform: "rotate(210deg)" }}
                          />
                        </div>
                      </div>
                      <div className="light-mode-icon w-100">
                        <div className="d-flex align-items-center w-100">
                          <span className="d-inline d-lg-none me-auto">
                            Light Mode
                          </span>
                          <i className="fa-solid fa-sun-bright fs-16" />
                        </div>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                   {walletInfo?.isConnected ? (
                    <NavDropdown
                      title={
                        <>
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded-circle"
                              src="public/assets/images/ton.png"
                              width={100}
                              height={24}
                              alt="Ton Coin"
                            />
                            <span className="fw-600 ms-2">
                              {`${walletInfo.balance
                                .toString()
                                .slice(0, -7)} TON`}
                            </span>
                            <i className="fa-solid fa-angle-down ms-3" />
                          </div>
                        </>
                      }
                      id="wallet-dropdown"
                      className="box-blur border rounded-8 text-nowrap d-none d-lg-flex align-items-center"
                    >
                      <NavDropdown.Item
                        className="d-flex align-items-center"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${walletInfo.address.toString()}`
                          );
                          setShowAlertCopyAddress(true);
                        }}
                      >
                        <i className="fa-light fa-copy dropdown-item-icon" />
                        <div className="ms-3">
                          Copy address
                          <div
                            className="text-muted small text-truncate"
                            style={{ minWidth: "150px" }}
                          >
                            {`${walletInfo.address
                              .toString()
                              .slice(0, 6)} . . . ${walletInfo.address
                              .toString()
                              .slice(-6)}`}
                          </div>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="d-flex align-items-center"
                        onClick={() => DeLabConnector.disconnect()}
                      >
                        <i className="fa-light fa-power-off dropdown-item-icon" />
                        <div className="ms-3">
                          Disconnect
                          <div className="text-muted small">
                            Disable your wallet
                          </div>
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                      <TonConnectButton/>
                  )}
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
