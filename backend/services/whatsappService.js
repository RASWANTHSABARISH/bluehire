/**
 * WhatsApp Notification Service (Mock Implementation)
 * 
 * In a production environment, this would integrate with Twilio, Gupshup, 
 * or the WhatsApp Cloud API to send actual messages to users.
 */

exports.sendJobAlert = async (worker, job, employerName) => {
  try {
    if (!worker.phone) return;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const messageTemplate = `
🔔 *New Job Alert near you in ${job.location.city}* 🔔

Hi ${worker.name.split(' ')[0]},

*${employerName}* is hiring for a *${job.title}* position.

💼 *Sector:* ${job.sector.charAt(0).toUpperCase() + job.sector.slice(1)}
💰 *Salary:* ₹${job.salaryMin} - ₹${job.salaryMax} / ${job.sectorMeta.salaryFreq}
⏱ *Timing:* ${job.shiftTiming}

*Interested?* 
Open the HireBlue app to apply or call the recruiter directly to schedule an interview!

_Stay connected for more blue-collar opportunities._
    `.trim();

    // In production:
    // await twilioClient.messages.create({
    //   body: messageTemplate,
    //   from: 'whatsapp:+14155238886',
    //   to: `whatsapp:+91${worker.phone}`
    // });

    console.log(`\n===========================================`);
    console.log(`[WHATSAPP ALERT SENT] to ${worker.name} (${worker.phone})`);
    console.log(`===========================================`);
    console.log(messageTemplate);
    console.log(`===========================================\n`);

    return true;
  } catch (err) {
    console.error('Error sending WhatsApp alert:', err.message);
    return false;
  }
};
