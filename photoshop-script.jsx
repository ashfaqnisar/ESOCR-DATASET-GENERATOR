#include json2.js


(function main() {
    var forms = loadJson('sample.json');
    var fonts = []
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        processForm(form, i);
    }

})();

function getRandomFont() {
    const fonts = ["Ink Free", "Caveat Regular", "Crafty Girls Regular", "Dancing Script Regular", "Gochi Hand", "Indie Flower", "Nanum Pen", "Patrick Hand", "Comic Sans MS", "Arial", "Calibri", "Segoe Print", "Segoe Script", "MV Boli"];
    const pFontName = fonts[Math.floor(Math.random() * fonts.length)];
    for (var i = 0; i < app.fonts.length; i++) {
        if (pFontName == app.fonts[i].postScriptName) {
            return pFontName; // already is an internal font name.
        }
        if (pFontName == app.fonts[i].name) {
            return app.fonts[i].postScriptName; // found an internal name.
        }
    }
    return null;
}

function processForm(form, index) {
    var doc = app.activeDocument
    var patientGroup = doc.layerSets.getByName('patient')
    var providerGroup = doc.layerSets.getByName('provider')
    var billingGroup = doc.layerSets.getByName('billing');
    var orderGroup = doc.layerSets.getByName('order')

    processPatient(patientGroup, form)
    processProvider(providerGroup, form)
    processBilling(billingGroup, form)
    processOrder(orderGroup, form)

    
    saveGroup(patientGroup, index, '-patient')
}

function processPatient(patientGroup, form) {
    var firstNameLayer = patientGroup.layers.getByName('firstName')
    var lastNameLayer = patientGroup.layers.getByName('lastName')
    var languageLayer = patientGroup.layers.getByName('language')
    var dobLayer = patientGroup.layers.getByName('dob')
    var idLayer = patientGroup.layers.getByName('id')
    var numberLayer = patientGroup.layers.getByName('number')
    var shippingAddressGroup = patientGroup.layerSets.getByName('shippingAddress')
    var billingAddressGroup = patientGroup.layerSets.getByName('billingAddress')

    var shippingAddress1 = shippingAddressGroup.layers.getByName('line1')
    var shippingAddress2 = shippingAddressGroup.layers.getByName('line2')
    var shippingAddressOther = shippingAddressGroup.layers.getByName('other')

    var billingAddress1 = billingAddressGroup.layers.getByName('line1')
    var billingAddress2 = billingAddressGroup.layers.getByName('line2')
    var billingAddressOther = billingAddressGroup.layers.getByName('other')


    firstNameLayer.textItem.contents = form.patient.firstName
    firstNameLayer.textItem.font = getRandomFont()

    lastNameLayer.textItem.contents = form.patient.lastName
    lastNameLayer.textItem.font = getRandomFont()

    languageLayer.textItem.contents = form.patient.language
    languageLayer.textItem.font = getRandomFont()

    dobLayer.textItem.contents = form.patient.dob
    dobLayer.textItem.font = getRandomFont()

    idLayer.textItem.contents = form.patient.id
    idLayer.textItem.font = getRandomFont()

    numberLayer.textItem.contents = form.patient.number
    numberLayer.textItem.font = getRandomFont()


    shippingAddress1.textItem.contents = form.patient.shippingAddress.address.line1
    shippingAddress1.textItem.font = getRandomFont()

    shippingAddress2.textItem.contents = form.patient.shippingAddress.address.line2
    shippingAddress2.textItem.font = getRandomFont()

    shippingAddressOther.textItem.contents = form.patient.shippingAddress.address.other
    shippingAddressOther.textItem.font = getRandomFont()


    billingAddress1.textItem.contents = form.patient.billingAddress.address.line1
    billingAddress1.textItem.font = getRandomFont()

    billingAddress2.textItem.contents = form.patient.billingAddress.address.line2
    billingAddress2.textItem.font = getRandomFont()

    billingAddressOther.textItem.contents = form.patient.billingAddress.address.other
    billingAddressOther.textItem.font = getRandomFont()

}

function processProvider(providerGroup, form) {
    var healthCareLayer = providerGroup.layers.getByName('healthCare')
    var nameLayer = providerGroup.layers.getByName('name')
    var addressLayer = providerGroup.layers.getByName('address')
    var faxNumberLayer = providerGroup.layers.getByName('faxNumber')
    var numberLayer = providerGroup.layers.getByName('number')
    var otherLayer = providerGroup.layers.getByName('other')

    var npiGroup = providerGroup.layerSets.getByName('NPI')

    for (var i = 0; i < npiGroup.layers.length; i++) {
        var npiLayer = npiGroup.layers[i]
        npiLayer.textItem.contents = form.provider.NPI[i]
        npiLayer.textItem.font = getRandomFont()
    }


    healthCareLayer.textItem.contents = form.provider.healthCare
    healthCareLayer.textItem.font = getRandomFont()

    nameLayer.textItem.contents = form.provider.name
    nameLayer.textItem.font = getRandomFont()

    // npiLayer.textItem.contents = form.provider.NPI
    // npiLayer.textItem.font=getRandomFont()

    addressLayer.textItem.contents = form.provider.address.line1
    addressLayer.textItem.font = getRandomFont()

    faxNumberLayer.textItem.contents = form.provider.faxNumber
    faxNumberLayer.textItem.font = getRandomFont()

    numberLayer.textItem.contents = form.provider.number
    numberLayer.textItem.font = getRandomFont()

    otherLayer.textItem.contents = form.provider.address.other
    otherLayer.textItem.font = getRandomFont()


}

function processBilling(billingGroup, form) {
    var nameLayer = billingGroup.layers.getByName("name")
    var dobLayer = billingGroup.layers.getByName("dob")
    var primaryInsuranceLayer = billingGroup.layers.getByName("primaryInsurance")
    var claimsSubmissionAddressLayer = billingGroup.layers.getByName("claimsSubmissionAddress")
    var policyNumberLayer = billingGroup.layers.getByName("policyNumber")
    var groupNumberLayer = billingGroup.layers.getByName("groupNumber")
    var planLayer = billingGroup.layers.getByName("plan")
    var priorAuthorizationCodeLayer = billingGroup.layers.getByName("priorAuthorizationCode")

    nameLayer.textItem.contents = form.billing.policyHolder.name
    nameLayer.textItem.font = getRandomFont()

    dobLayer.textItem.contents = form.billing.policyHolder.dob
    dobLayer.textItem.font = getRandomFont()

    primaryInsuranceLayer.textItem.contents = form.billing.primaryInsurance
    primaryInsuranceLayer.textItem.font = getRandomFont()

    claimsSubmissionAddressLayer.textItem.contents = form.billing.claimsSubmissionAddress
    claimsSubmissionAddressLayer.textItem.font = getRandomFont()

    policyNumberLayer.textItem.contents = form.billing.policyNumber
    policyNumberLayer.textItem.font = getRandomFont()

    groupNumberLayer.textItem.contents = form.billing.groupNumber
    groupNumberLayer.textItem.font = getRandomFont()

    planLayer.textItem.contents = form.billing.plan
    planLayer.textItem.font = getRandomFont()

    priorAuthorizationCodeLayer.textItem.contents = form.billing.priorAuthorizationCode
    priorAuthorizationCodeLayer.textItem.font = getRandomFont()

}

function processOrder(orderGroup, form) {
    var icdCodeLayer = orderGroup.layers.getByName("icdCode")
    var dateOfOrderLayer = orderGroup.layers.getByName("dateOfOrder")
   

    icdCodeLayer.textItem.contents = form.order.icdCode
    icdCodeLayer.textItem.font = getRandomFont()

    dateOfOrderLayer.textItem.contents = form.order.dateOfOrder
    dateOfOrderLayer.textItem.font = getRandomFont()

}

function saveGroup(group, name) {
    group.visible = true
    saveJpeg(name)
    group.visible = false
}

// saveJpeg("One")

function loadJson(relPath) {
    var script = new File($.fileName)
    var jsonFile = new File(script.path + '/' + relPath)
    jsonFile.open('r')
    var str = jsonFile.read();
    jsonFile.close();

    return JSON.parse(str)
}

function saveJpeg(name) {
    var doc = app.activeDocument;

    var file = new File('D:/Projects/OCR/images/generatedImages/' + name + '.jpg');
    var saveOptions = new JPEGSaveOptions();
    saveOptions.quality = 7;

    doc.saveAs(file, saveOptions, true)
}